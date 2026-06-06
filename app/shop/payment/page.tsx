'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, QrCode, Clock } from 'lucide-react';

export default function QRPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'ready' | 'paid' | 'expired'>('loading');
  const [error, setError] = useState<string | null>(null);

  const qrImageUrl = searchParams.get('qr');
  const paymentIntentId = searchParams.get('id');

  useEffect(() => {
    if (!qrImageUrl || !paymentIntentId) {
      setError('Invalid payment session');
      setStatus('expired');
      return;
    }
    setStatus('ready');

    // Poll for payment status
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/paymongo/check-payment?intentId=${paymentIntentId}`);
        const data = await response.json();
        
        if (data.status === 'paid') {
          setStatus('paid');
          setTimeout(() => router.push('/shop/success'), 2000);
        } else if (data.status === 'expired') {
          setStatus('expired');
        }
      } catch (err) {
        // Continue polling
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [qrImageUrl, paymentIntentId, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'expired' || error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <XCircle size={36} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Expired</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {error || 'This payment session has expired. Please try again.'}
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

  if (status === 'paid') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-teal-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Redirecting you to the confirmation page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* Back nav */}
        <button
          onClick={() => router.push('/shop')}
          className="inline-flex items-center gap-1.5 text-gray-900 hover:text-gray-800 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </button>

        {/* QR Payment Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <QrCode size={36} className="text-teal-500" />
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">Scan to Pay</h1>
          <p className="text-gray-500 text-sm mb-6">
            Use your mobile banking app or e-wallet to scan this QR code and complete your payment.
          </p>

          {/* QR Code Image */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 mb-6">
            <img
              src={qrImageUrl || ''}
              alt="QR Code for payment"
              className="w-full max-w-xs mx-auto"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-4">
            <Clock size={12} />
            <span>Waiting for payment confirmation...</span>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed">
            This QR code is valid for 15 minutes. If the payment fails, please try again.
          </p>
        </div>
      </div>
    </div>
  );
}
