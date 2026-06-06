'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
                <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={36} className="text-teal-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                    Your payment has been processed successfully.
                </p>
                <p className="text-gray-400 text-xs mb-8">
                    A confirmation receipt will be sent to your email shortly.
                </p>
                <button
                    onClick={() => router.push('/shop')}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Back to Shop
                </button>
            </div>
        </div>
    );
}