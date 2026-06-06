User clicks "Pay"
    ↓
Frontend calls your Next.js API route (POST /api/paymongo/create-payment)
    ↓
API route uses SECRET KEY → calls PayMongo to create a PaymentIntent + Source
    ↓
Returns checkout_url to frontend
    ↓
Frontend redirects user to PayMongo's hosted checkout page
    ↓
PayMongo redirects back to /shop/success (or /shop/failed)