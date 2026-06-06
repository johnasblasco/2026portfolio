'use client';

import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function FailedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                    <XCircle size={36} className="text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Something went wrong with your payment. Please try again or choose a different payment method.
                </p>
                <button
                    onClick={() => router.back()}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}