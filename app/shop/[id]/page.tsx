'use client';

import { useState, type ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, ShoppingCart, ArrowLeft, CheckCircle, Shield, RefreshCcw, Headphones, Package } from 'lucide-react';

// Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

// Sample products
const products: Product[] = [
  {
    id: 1,
    name: 'Premium Website Template',
    description: 'Professional responsive template for your business. Includes 10+ page layouts, responsive design, and customizable components.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Templates',
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: 'Mobile App UI Kit',
    description: 'Complete UI kit with 50+ screens for mobile apps. Includes iOS and Android components, dark mode support, and Figma files.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    category: 'UI Kits',
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: 'Brand Identity Package',
    description: 'Logo, color palette, and style guide for your brand. Includes multiple logo variations, brand book, and social media assets.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    category: 'Branding',
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: 'Dashboard Analytics',
    description: 'Modern dashboard with charts and data visualization. Includes real-time data, customizable widgets, and dark/light themes.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Dashboards',
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    name: 'E-commerce Platform',
    description: 'Full e-commerce solution with cart and checkout. Includes product management, payment integration, and order tracking.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    category: 'Platforms',
    rating: 4.8,
    inStock: true
  },
  {
    id: 6,
    name: 'Portfolio Template',
    description: 'Beautiful portfolio template to showcase your work. Includes projects grid, about section, contact form, and blog integration.',
    price: 69,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    category: 'Templates',
    rating: 4.9,
    inStock: true
  },
];

// Payment method groups
interface PaymentGroup {
  label: string;
  methods: {
    id: string;
    name: string;
    logo: ReactNode;
    tag?: string;
  }[];
}

// SVG logos for payment methods
const GCashLogo = () => (
  <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
    <rect width="52" height="20" rx="4" fill="#007DFE" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">GCash</text>
  </svg>
);

const MayaLogo = () => (
  <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
    <rect width="52" height="20" rx="4" fill="#00BFA5" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">Maya</text>
  </svg>
);

const GrabPayLogo = () => (
  <svg width="62" height="20" viewBox="0 0 62 20" fill="none">
    <rect width="62" height="20" rx="4" fill="#00B14F" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">GrabPay</text>
  </svg>
);

const ShopeeLogo = () => (
  <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
    <rect width="80" height="20" rx="4" fill="#EE4D2D" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">ShopeePay</text>
  </svg>
);

const VisaLogo = () => (
  <svg width="42" height="20" viewBox="0 0 42 20" fill="none">
    <rect width="42" height="20" rx="4" fill="#1A1F71" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="serif" letterSpacing="1">VISA</text>
  </svg>
);

const MastercardLogo = () => (
  <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
    <rect width="52" height="20" rx="4" fill="#252525" />
    <circle cx="20" cy="10" r="7" fill="#EB001B" />
    <circle cx="32" cy="10" r="7" fill="#F79E1B" />
    <path d="M26 4.8C27.8 6.2 29 8 29 10C29 12 27.8 13.8 26 15.2C24.2 13.8 23 12 23 10C23 8 24.2 6.2 26 4.8Z" fill="#FF5F00" />
  </svg>
);

const QRPhLogo = () => (
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
    <rect width="48" height="20" rx="4" fill="#0038A8" />
    <text x="50%" y="14" textAnchor="middle" fill="#FCD116" fontSize="9" fontWeight="700" fontFamily="sans-serif">QR Ph</text>
  </svg>
);

const BDOLogo = () => (
  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
    <rect width="40" height="20" rx="4" fill="#003087" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">BDO</text>
  </svg>
);

const BPILogo = () => (
  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
    <rect width="40" height="20" rx="4" fill="#C8102E" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">BPI</text>
  </svg>
);

const MetrobankLogo = () => (
  <svg width="74" height="20" viewBox="0 0 74 20" fill="none">
    <rect width="74" height="20" rx="4" fill="#0E3572" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">Metrobank</text>
  </svg>
);

const LandbankLogo = () => (
  <svg width="68" height="20" viewBox="0 0 68 20" fill="none">
    <rect width="68" height="20" rx="4" fill="#006633" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">Landbank</text>
  </svg>
);

const UnionBankLogo = () => (
  <svg width="74" height="20" viewBox="0 0 74 20" fill="none">
    <rect width="74" height="20" rx="4" fill="#E31837" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">UnionBank</text>
  </svg>
);

const BillEaseLogo = () => (
  <svg width="62" height="20" viewBox="0 0 62 20" fill="none">
    <rect width="62" height="20" rx="4" fill="#5B2D8E" />
    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">BillEase</text>
  </svg>
);

const paymentGroups: PaymentGroup[] = [
  {
    label: 'E-Wallets',
    methods: [
      { id: 'gcash', name: 'GCash', logo: <GCashLogo /> },
      { id: 'maya', name: 'Maya', logo: <MayaLogo /> },
      { id: 'grabpay', name: 'GrabPay', logo: <GrabPayLogo /> },
      { id: 'shopeepay', name: 'ShopeePay', logo: <ShopeeLogo /> },
    ]
  },
  {
    label: 'Cards',
    methods: [
      { id: 'visa', name: 'Visa', logo: <VisaLogo /> },
      { id: 'mastercard', name: 'Mastercard', logo: <MastercardLogo /> },
    ]
  },
  {
    label: 'QR Payment',
    methods: [
      { id: 'qrph', name: 'QR Ph', logo: <QRPhLogo />, tag: 'Any bank or e-wallet' },
    ]
  },
  {
    label: 'Online Banking',
    methods: [
      { id: 'bdo', name: 'BDO', logo: <BDOLogo /> },
      { id: 'bpi', name: 'BPI', logo: <BPILogo /> },
      { id: 'metrobank', name: 'Metrobank', logo: <MetrobankLogo /> },
      { id: 'landbank', name: 'Landbank', logo: <LandbankLogo /> },
      { id: 'unionbank', name: 'UnionBank', logo: <UnionBankLogo /> },
    ]
  },
  {
    label: 'Buy Now, Pay Later',
    methods: [
      { id: 'billease', name: 'BillEase', logo: <BillEaseLogo />, tag: 'Installment options' },
    ]
  },
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-400 ml-0.5">{rating}</span>
    </div>
  );
}

// Format price in PHP
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price * 57); // rough USD→PHP

// Also keep USD for reference
const formatUSD = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [selectedPayment, setSelectedPayment] = useState('gcash');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const productId = Number(params?.id);
  const product = products.find((p) => p.id === productId);
  const total = product ? product.price * quantity : 0;

  const handlePayment = async () => {
    if (!product) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setPaymentSuccess(true);
    setTimeout(() => router.push('/shop/success'), 3000);
  };

  const goBack = () => router.push('/shop');

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <ShoppingCart size={28} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 text-sm mb-6">This product doesn't exist or may have been removed.</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-teal-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Your payment of <span className="font-semibold text-gray-800">{formatPrice(total)}</span> via{' '}
            <span className="font-semibold text-gray-800">
              {paymentGroups.flatMap(g => g.methods).find(m => m.id === selectedPayment)?.name}
            </span>{' '}
            has been processed.
          </p>
          <p className="text-gray-400 text-xs mb-8">A confirmation receipt will be sent to your email shortly.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={goBack}
              className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedMethodInfo = paymentGroups.flatMap(g => g.methods).find(m => m.id === selectedPayment);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back nav */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-800 transition-colors mb-8 text-sm"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">

          {/* LEFT: Product + Payment Methods */}
          <div className="space-y-5 lg:pb-10">

            {/* Product card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-teal-50/90 backdrop-blur-sm text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-100">
                    {product.category}
                  </span>
                </div>
                {product.inStock && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-teal-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h1 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h1>
                  <StarRating rating={product.rating} />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-800">Payment Method</h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Shield size={12} />
                  Secured by PayMongo
                </div>
              </div>

              <div className="space-y-5">
                {paymentGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">{group.label}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {group.methods.map((method) => {
                        const isSelected = selectedPayment === method.id;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`relative flex flex-col items-start gap-2 p-3 rounded-xl border transition-all duration-150 text-left
                              ${isSelected
                                ? 'border-teal-400 bg-teal-50 ring-1 ring-teal-300'
                                : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
                              }`}
                          >
                            {isSelected && (
                              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                  <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            )}
                            {method.logo}
                            <div>
                              <p className={`text-xs font-semibold leading-tight ${isSelected ? 'text-teal-800' : 'text-gray-700'}`}>
                                {method.name}
                              </p>
                              {method.tag && (
                                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{method.tag}</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>

          {/* RIGHT: Order Summary + Pay */}
          <div className="space-y-4">

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Order Summary</h2>

              {/* Price display */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price * quantity)}</p>
                <p className="text-xs text-gray-400 mt-0.5">≈ {formatUSD(product.price * quantity)} USD</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Quantity</span>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors text-base"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Unit price</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Quantity</span>
                  <span>× {quantity}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-900 border-t border-gray-100 pt-2 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Selected method + Pay CTA */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-teal-50 border border-teal-100">
                <div className="flex-shrink-0">
                  {selectedMethodInfo?.logo}
                </div>
                <div>
                  <p className="text-xs font-semibold text-teal-800">{selectedMethodInfo?.name}</p>
                  <p className="text-[11px] text-teal-400">Selected payment method</p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isSubmitting || !product.inStock}
                className="w-full bg-teal-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>Pay {formatPrice(total)}</>
                )}
              </button>

              <p className="text-center text-[11px] text-gray-400 mt-3 leading-relaxed">
                By completing this purchase you agree to our{' '}
                <span className="underline cursor-pointer">Terms</span> &amp;{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>.
                Powered by <span className="font-medium text-gray-500">PayMongo</span>.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 px-2 py-1">
              {[
                { icon: <Shield size={12} />, label: 'SSL Encrypted' },
                { icon: <CheckCircle size={12} />, label: 'PCI Compliant' },
                { icon: <RefreshCcw size={12} />, label: '30-day Refund' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-1 text-[11px] text-gray-400">
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}