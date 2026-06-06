'use client';

import { useState, type ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, ShoppingCart, ArrowLeft, CheckCircle, Shield, RefreshCcw, Headphones, Package, ShoppingBag, BarChart3, Users, Zap } from 'lucide-react';

// Product type
interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

// Same products as the shop listing page (PHP prices)
const products: Product[] = [
  {
    id: 1,
    name: 'Point of Sale System',
    tagline: 'Retail & F&B ready',
    description: 'Complete POS solution with inventory tracking, sales reports, and multi-branch support.',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    category: 'Retail',
    rating: 4.9,
    reviews: 128,
    inStock: true,
    badge: 'Bestseller',
    icon: ShoppingCart,
    color: 'from-teal-400 to-teal-600',
  },
  {
    id: 2,
    name: 'HR & Payroll System',
    tagline: 'BIR & SSS compliant',
    description: 'Automate payroll computation, attendance, leaves, and government contributions with ease.',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    category: 'HR',
    rating: 4.8,
    reviews: 94,
    inStock: true,
    icon: Users,
    color: 'from-orange-400 to-orange-600',
  },
  {
    id: 3,
    name: 'Inventory Management',
    tagline: 'Real-time stock control',
    description: 'Monitor stock levels, automate reordering, manage suppliers, and generate inventory reports.',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    category: 'Operations',
    rating: 4.7,
    reviews: 76,
    inStock: true,
    icon: Package,
    color: 'from-red-400 to-red-600',
  },
  {
    id: 4,
    name: 'Accounting & Finance',
    tagline: 'BIR e-filing integrated',
    description: 'Full bookkeeping, invoicing, financial statements, and VAT/withholding tax reports.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Finance',
    rating: 4.9,
    reviews: 112,
    inStock: true,
    badge: 'Popular',
    icon: BarChart3,
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    id: 5,
    name: 'CRM & Sales Pipeline',
    tagline: 'Leads to loyal customers',
    description: 'Track leads, manage customer relationships, automate follow-ups, and forecast sales.',
    price: 15800,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Sales',
    rating: 4.8,
    reviews: 88,
    inStock: true,
    icon: Zap,
    color: 'from-amber-400 to-amber-600',
  },
  {
    id: 6,
    name: 'Hospital & Clinic System',
    tagline: 'Patient-first records',
    description: 'EMR, appointment scheduling, billing, pharmacy module, and PhilHealth/HMO processing.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    category: 'Healthcare',
    rating: 4.9,
    reviews: 61,
    inStock: true,
    badge: 'Enterprise',
    icon: Shield,
    color: 'from-gray-400 to-gray-600',
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
function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
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
      {reviews && <span className="text-xs text-gray-300">({reviews})</span>}
    </div>
  );
}

// Format price in PHP
const formatPHP = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [selectedPayment, setSelectedPayment] = useState('gcash');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productId = Number(params?.id);
  const product = products.find((p) => p.id === productId);
  const total = product ? product.price * quantity : 0;

  const handlePayment = async () => {
    if (!product) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/paymongo/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          amount: product.price,
          quantity: quantity,
          paymentMethod: selectedPayment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      // Handle different response types from PayMongo
      switch (data.type) {
        case 'redirect':
          // For GCash, GrabPay, and other redirect-based methods
          window.location.href = data.checkoutUrl;
          break;
        case 'card':
          // For card payments - would need @paymongo/paymongo-js integration
          // For now, show error that card payments need frontend integration
          setError('Card payments require additional setup. Please choose another method.');
          setIsSubmitting(false);
          break;
        case 'qr':
          // For QR Ph payments - show QR code
          router.push(`/shop/payment?qr=${encodeURIComponent(data.qrImageUrl)}&id=${data.paymentIntentId}`);
          break;
        case 'success':
          // Rare case where payment succeeds immediately in test mode
          router.push('/shop/success');
          break;
        default:
          setError('Unexpected response from payment provider');
          setIsSubmitting(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setIsSubmitting(false);
    }
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

  const selectedMethodInfo = paymentGroups.flatMap(g => g.methods).find(m => m.id === selectedPayment);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back nav */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-gray-900 hover:text-gray-800 transition-colors mb-8 text-sm"
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
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
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
                <p className="text-2xl font-bold text-gray-900">{formatPHP(product.price * quantity)}</p>
                <p className="text-xs text-gray-400 mt-0.5">PHP</p>
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
                  <span>{formatPHP(product.price)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Quantity</span>
                  <span>× {quantity}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-900 border-t border-gray-100 pt-2 mt-2">
                  <span>Total</span>
                  <span>{formatPHP(total)}</span>
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
                  <p className="text-xs font-semibold text-gray-900">{selectedMethodInfo?.name}</p>
                  <p className="text-[11px] text-gray-700 font-bold">Selected payment method</p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl mb-4">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              <button
                onClick={handlePayment}
                disabled={isSubmitting || !product.inStock}
                className="cursor-pointer w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>Pay {formatPHP(total)}</>
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