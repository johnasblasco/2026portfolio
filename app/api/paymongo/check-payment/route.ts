import { NextRequest, NextResponse } from 'next/server';

const PAYMONGO_BASE = 'https://api.paymongo.com/v1';

export async function GET(req: NextRequest) {
    const intentId = req.nextUrl.searchParams.get('intentId');

    try {
        const secretKey = process.env.PAYMONGO_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ error: 'PayMongo secret key not configured.' }, { status: 500 });
        }

        if (!intentId) {
            return NextResponse.json({ error: 'Payment intent ID is required.' }, { status: 400 });
        }

        const auth = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');

        // Check PaymentIntent status
        const res = await fetch(`${PAYMONGO_BASE}/payment_intents/${intentId}`, {
            method: 'GET',
            headers: { Authorization: auth, 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('PaymentIntent check error:', JSON.stringify(data));
            return NextResponse.json(
                { error: data.errors?.[0]?.detail ?? 'Failed to check payment status.' },
                { status: 400 },
            );
        }

        const status = data.data?.attributes?.status;
        
        return NextResponse.json({ 
            status: status === 'succeeded' ? 'paid' : status,
            intentId,
            rawStatus: status
        });

    } catch (err) {
        console.error('Check payment error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
