import { NextRequest, NextResponse } from 'next/server';

const PAYMONGO_BASE = 'https://api.paymongo.com/v1';

// Map your payment method IDs to PayMongo source types
const PAYMENT_METHOD_MAP: Record<string, string> = {
    gcash: 'gcash',
    maya: 'paymaya',
    grabpay: 'grab_pay',
    shopeepay: 'shopeepay',
    qrph: 'qrph',
    bdo: 'dob',      // Direct Online Banking
    bpi: 'dob',
    metrobank: 'dob',
    landbank: 'dob',
    unionbank: 'dob',
    billease: 'billease',
    visa: 'card',
    mastercard: 'card',
};

export async function POST(req: NextRequest) {
    try {
        const { productName, amount, quantity, paymentMethod, currency = 'PHP' } = await req.json();

        const secretKey = process.env.PAYMONGO_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: 'PayMongo secret key not configured.' }, { status: 500 });
        }

        const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');
        const totalAmountCents = Math.round(amount * quantity * 100); // PayMongo uses centavos
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const sourceType = PAYMENT_METHOD_MAP[paymentMethod] ?? 'gcash';

        // --- Card payments use PaymentIntent + PaymentMethod flow ---
        if (sourceType === 'card') {
            const intentRes = await fetch(`${PAYMONGO_BASE}/payment_intents`, {
                method: 'POST',
                headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            amount: totalAmountCents,
                            payment_method_allowed: ['card'],
                            payment_method_options: { card: { request_three_d_secure: 'any' } },
                            currency,
                            description: `${productName} x${quantity}`,
                            capture_type: 'automatic',
                        },
                    },
                }),
            });
            const intentData = await intentRes.json();
            if (!intentRes.ok) {
                console.error('PayMongo PaymentIntent error:', intentData);
                return NextResponse.json({ error: intentData.errors?.[0]?.detail ?? 'Failed to create payment intent.' }, { status: 400 });
            }
            return NextResponse.json({
                type: 'card',
                clientKey: intentData.data.attributes.client_key,
                paymentIntentId: intentData.data.id,
            });
        }

        // --- E-wallets, QR, Online Banking, BNPL use Sources flow ---
        const sourceRes = await fetch(`${PAYMONGO_BASE}/sources`, {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    attributes: {
                        amount: totalAmountCents,
                        currency,
                        type: sourceType,
                        redirect: {
                            success: `${baseUrl}/shop/success?payment=success`,
                            failed: `${baseUrl}/shop/failed?payment=failed`,
                        },
                        billing: {
                            name: 'Customer',
                            email: 'customer@example.com', // Replace with actual user email from your auth
                        },
                        description: `${productName} x${quantity}`,
                    },
                },
            }),
        });

        const sourceData = await sourceRes.json();
        if (!sourceRes.ok) {
            console.error('PayMongo Source error:', sourceData);
            return NextResponse.json({ error: sourceData.errors?.[0]?.detail ?? 'Failed to create payment source.' }, { status: 400 });
        }

        const checkoutUrl = sourceData.data?.attributes?.redirect?.checkout_url;
        const sourceId = sourceData.data?.id;

        if (!checkoutUrl) {
            return NextResponse.json({ error: 'No checkout URL returned from PayMongo.' }, { status: 500 });
        }

        return NextResponse.json({ type: 'redirect', checkoutUrl, sourceId });
    } catch (err) {
        console.error('PayMongo integration error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}