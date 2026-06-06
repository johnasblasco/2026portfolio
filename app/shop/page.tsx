'use client';

import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ShoppingBag, Heart, Search, Star, Zap, BarChart3, Users, Shield, Package, ArrowUpRight, ChevronRight } from 'lucide-react';

// ─── Fade-in hook ────────────────────────────────────────────────────────────
function useFadeIn(index: number, delayStep = 80) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), index * delayStep);
                }
            },
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [index, delayStep]);

    return { ref, isVisible };
}

function useInView(threshold = 0.1) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [threshold]);
    return { ref, inView };
}

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Software System Products (prices in PHP) ────────────────────────────────
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

const categories = ['All', 'Retail', 'HR', 'Operations', 'Finance', 'Sales', 'Healthcare'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPHP = (amount: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={12}
                        className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                    />
                ))}
            </div>
            <span className="text-xs text-gray-400 ml-0.5">{rating}</span>
            {reviews && <span className="text-xs text-gray-300">({reviews})</span>}
        </div>
    );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeColors: Record<string, string> = {
    Bestseller: 'bg-orange-50 text-orange-700 border-orange-200',
    Popular: 'bg-teal-50 text-teal-700 border-teal-200',
    Enterprise: 'bg-gray-100 text-gray-700 border-gray-200',
};

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
    const router = useRouter();
    const [wished, setWished] = useState(false);
    const { ref, isVisible } = useFadeIn(index, 80);
    const Icon = product.icon;

    const openProduct = () => router.push(`/shop/${product.id}`);

    const handleWishlist = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setWished((w) => !w);
    };

    const handleBuy = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`/shop/${product.id}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProduct(); }
    };

    return (
        <div
            ref={ref}
            onClick={openProduct}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className={`group bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-100 hover:border-gray-200
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: isVisible ? '0ms' : `${index * 80}ms` }}
        >
            {/* Image with gradient border */}
            <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10`} />
                <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category pill */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gray-200">
                    {product.category}
                </span>

                {/* Badge */}
                {product.badge && (
                    <span className={`absolute top-4 right-4 text-[10px] font-semibold px-3 py-1.5 rounded-full border ${badgeColors[product.badge]}`}>
                        {product.badge}
                    </span>
                )}

                {/* Hover actions */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                        type="button"
                        onClick={handleWishlist}
                        aria-label={`${wished ? 'Remove from' : 'Add to'} wishlist`}
                        className="w-9 h-9 bg-white/95 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                        <Heart size={14} className={wished ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
                    </button>
                    <button
                        type="button"
                        onClick={handleBuy}
                        aria-label={`Buy ${product.name}`}
                        className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-700 transition-colors"
                    >
                        <ArrowUpRight size={14} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Icon + name */}
                <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                        <Icon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-gray-900 transition-colors truncate">
                            {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">{product.tagline}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-2">{product.description}</p>

                {/* Price + rating */}
                <div className="flex items-end justify-between mb-5">
                    <div>
                        <p className="text-xl font-bold text-gray-900">{formatPHP(product.price)}</p>
                        <p className="text-[10px] text-gray-400">one-time license</p>
                    </div>
                    <StarRating rating={product.rating} reviews={product.reviews} />
                </div>
            </div>

            {/* Buy button */}
            <div className="px-6 pb-6">
                <button
                    type="button"
                    onClick={handleBuy}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
                >
                    <ShoppingCart size={14} />
                    Buy Now
                </button>
            </div>
        </div>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
    const { ref, inView } = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6 w-fit">
                <Zap size={12} />
                <span className="text-xs font-semibold">Software Solutions</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                        Business Systems
                        <br />
                        <span className="text-teal-400 font-normal">Built for the PH Market</span>
                    </h1>
                    <p className="text-gray-500 text-base lg:text-lg max-w-xl">
                        Ready-to-deploy software for retail, HR, finance, and more — BIR compliant, locally supported.
                    </p>

                    <button className="mt-8 cursor-pointer bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-fit">
                        Explore Systems
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-6 lg:gap-8 flex-shrink-0">
                    {[
                        { value: '500+', label: 'Businesses' },
                        { value: '6', label: 'Systems' },
                        { value: '4.8★', label: 'Avg Rating' },
                    ].map((s) => (
                        <div key={s.label} className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
                type="text"
                placeholder="Search systems..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full sm:w-80 pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-all shadow-sm"
            />
        </div>
    );
}

// ─── Category Filter ──────────────────────────────────────────────────────────
function CategoryFilter({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 border
            ${selected === cat
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────
type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating';

function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortKey)}
            className="text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm cursor-pointer"
        >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
        </select>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState<SortKey>('default');

    const filtered = products
        .filter((p) => {
            const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
            const matchesSearch =
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        })
        .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            if (sort === 'rating') return b.rating - a.rating;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Hero */}
                <HeroSection />

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    <div className="flex items-center gap-3 flex-wrap">
                        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
                        <SortSelect value={sort} onChange={setSort} />
                    </div>
                </div>

                {/* Results count */}
                <p className="text-xs text-gray-400 mb-6">
                    {filtered.length} system{filtered.length !== 1 ? 's' : ''} found
                    {selectedCategory !== 'All' && <> in <span className="text-gray-600 font-medium">{selectedCategory}</span></>}
                </p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <ShoppingBag size={24} className="text-gray-300" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 mb-1">No systems found</h3>
                        <p className="text-sm text-gray-400">Try a different search or category.</p>
                    </div>
                )}

                {/* Footer note */}
                <p className="pb-40 text-center text-xs text-gray-500 mt-16">
                    All systems include free setup assistance · Local support · Lifetime license
                </p>
            </div>
        </div>
    );
}
