import { NextRequest, NextResponse } from 'next/server';

const PAYMONGO_BASE = 'https://api.paymongo.com/v1';

/**
 * PayMongo exact type strings (from docs):
 * Sources workflow (redirect-based): gcash, grab_pay only
 * Payment Intent workflow (everything else):
 *   paymaya, shopee_pay, qrph, billease, dob (direct online banking), card
 */

// Methods that use the legacy Sources API (redirect flow)
const SOURCES_TYPES: Record<string, string> = {
    gcash: 'gcash',
    grabpay: 'grab_pay',
};

// Methods that use the Payment Intent API
const PAYMENT_INTENT_TYPES: Record<string, string> = {
    maya: 'paymaya',
    shopeepay: 'shopee_pay',
    qrph: 'qrph',
    billease: 'billease',
    bdo: 'dob',
    bpi: 'dob',
    metrobank: 'dob',
    landbank: 'dob',
    unionbank: 'dob',
    visa: 'card',
    mastercard: 'card',
};

export async function POST(req: NextRequest) {
    try {
        const { productName, amount, quantity, paymentMethod } = await req.json();

        const secretKey = process.env.PAYMONGO_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: 'PayMongo secret key not configured.' }, { status: 500 });
        }

        const auth = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');
        const centavos = Math.round(amount * quantity * 100); // PHP → centavos
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const description = `${productName} × ${quantity}`;

        // ── 1. Sources workflow: GCash & GrabPay ─────────────────────────────────
        if (SOURCES_TYPES[paymentMethod]) {
            const sourceType = SOURCES_TYPES[paymentMethod];

            const res = await fetch(`${PAYMONGO_BASE}/sources`, {
                method: 'POST',
                headers: { Authorization: auth, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            amount: centavos,
                            currency: 'PHP',
                            type: sourceType,
                            description,
                            redirect: {
                                success: `${baseUrl}/shop/success`,
                                failed: `${baseUrl}/shop/failed`,
                            },
                            billing: {
                                name: 'Customer',
                                email: 'customer@example.com', // replace with real user email
                            },
                        },
                    },
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                console.error('Source error:', JSON.stringify(data));
                return NextResponse.json(
                    { error: data.errors?.[0]?.detail ?? 'Failed to create payment source.' },
                    { status: 400 },
                );
            }

            const checkoutUrl = data.data?.attributes?.redirect?.checkout_url;
            if (!checkoutUrl) {
                return NextResponse.json({ error: 'No checkout URL returned.' }, { status: 500 });
            }

            return NextResponse.json({ type: 'redirect', checkoutUrl, sourceId: data.data?.id });
        }

        // ── 2. Payment Intent workflow: everything else ───────────────────────────
        const pmType = PAYMENT_INTENT_TYPES[paymentMethod];
        if (!pmType) {
            return NextResponse.json({ error: `Unsupported payment method: ${paymentMethod}` }, { status: 400 });
        }

        // Step 2a: Create PaymentIntent
        const intentRes = await fetch(`${PAYMONGO_BASE}/payment_intents`, {
            method: 'POST',
            headers: { Authorization: auth, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    attributes: {
                        amount: centavos,
                        currency: 'PHP',
                        payment_method_allowed: [pmType],
                        description,
                        capture_type: 'automatic',
                        ...(pmType === 'card' && {
                            payment_method_options: { card: { request_three_d_secure: 'any' } },
                        }),
                    },
                },
            }),
        });

        const intentData = await intentRes.json();
        if (!intentRes.ok) {
            console.error('PaymentIntent error:', JSON.stringify(intentData));
            return NextResponse.json(
                { error: intentData.errors?.[0]?.detail ?? 'Failed to create payment intent.' },
                { status: 400 },
            );
        }

        const intentId = intentData.data.id;
        const clientKey = intentData.data.attributes.client_key;

        // Card — return clientKey to frontend (needs @paymongo/paymongo-js for card form)
        if (pmType === 'card') {
            return NextResponse.json({ type: 'card', clientKey, paymentIntentId: intentId });
        }

        // Step 2b: Create PaymentMethod for non-card methods
        const pmRes = await fetch(`${PAYMONGO_BASE}/payment_methods`, {
            method: 'POST',
            headers: { Authorization: auth, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    attributes: {
                        type: pmType,
                        billing: {
                            name: 'Customer',
                            email: 'customer@example.com', // replace with real user email
                        },
                    },
                },
            }),
        });

        const pmData = await pmRes.json();
        if (!pmRes.ok) {
            console.error('PaymentMethod error:', JSON.stringify(pmData));
            return NextResponse.json(
                { error: pmData.errors?.[0]?.detail ?? 'Failed to create payment method.' },
                { status: 400 },
            );
        }

        const paymentMethodId = pmData.data.id;

        // Step 2c: Attach PaymentMethod to PaymentIntent
        const attachRes = await fetch(`${PAYMONGO_BASE}/payment_intents/${intentId}/attach`, {
            method: 'POST',
            headers: { Authorization: auth, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    attributes: {
                        payment_method: paymentMethodId,
                        client_key: clientKey,
                        return_url: `${baseUrl}/shop/success`,
                    },
                },
            }),
        });

        const attachData = await attachRes.json();
        if (!attachRes.ok) {
            console.error('Attach error:', JSON.stringify(attachData));
            return NextResponse.json(
                { error: attachData.errors?.[0]?.detail ?? 'Failed to attach payment method.' },
                { status: 400 },
            );
        }

        const status = attachData.data?.attributes?.status;
        const nextAction = attachData.data?.attributes?.next_action;

        // Needs redirect (Maya, ShopeePay, BillEase, DOB)
        if (nextAction?.type === 'redirect') {
            const redirectUrl = nextAction.redirect?.url;
            if (redirectUrl) {
                return NextResponse.json({ type: 'redirect', checkoutUrl: redirectUrl });
            }
        }

        // QR Ph returns a QR code image
        if (nextAction?.type === 'display_qr_code' || nextAction?.code?.image_url) {
            return NextResponse.json({
                type: 'qr',
                qrImageUrl: nextAction.code?.image_url ?? nextAction.image_url,
                paymentIntentId: intentId,
                clientKey,
            });
        }

        // Already succeeded (rare in test mode)
        if (status === 'succeeded') {
            return NextResponse.json({ type: 'success' });
        }

        return NextResponse.json({ error: 'Unexpected payment state: ' + status }, { status: 500 });

    } catch (err) {
        console.error('PayMongo error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}