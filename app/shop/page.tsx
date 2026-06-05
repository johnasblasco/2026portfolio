'use client';

import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ShoppingBag, Heart, Star, Search } from 'lucide-react';

// Fade in animation hook
function useInView(threshold = 0.1) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return { ref, inView };
}

// Simple fade in animation for each card
function useFadeIn(index: number, delayStep = 100) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * delayStep);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [index, delayStep]);

    return { ref, isVisible };
}

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
        description: 'Professional responsive template for your business',
        price: 129,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        category: 'Templates',
        rating: 4.8,
        inStock: true
    },
    {
        id: 2,
        name: 'Mobile App UI Kit',
        description: 'Complete UI kit with 50+ screens for mobile apps',
        price: 89,
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
        category: 'UI Kits',
        rating: 4.9,
        inStock: true
    },
    {
        id: 3,
        name: 'Brand Identity Package',
        description: 'Logo, color palette, and style guide for your brand',
        price: 249,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        category: 'Branding',
        rating: 4.7,
        inStock: true
    },
    {
        id: 4,
        name: 'Dashboard Analytics',
        description: 'Modern dashboard with charts and data visualization',
        price: 99,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        category: 'Dashboards',
        rating: 4.9,
        inStock: true
    },
    {
        id: 5,
        name: 'E-commerce Platform',
        description: 'Full e-commerce solution with cart and checkout',
        price: 299,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        category: 'Platforms',
        rating: 4.8,
        inStock: true
    },
    {
        id: 6,
        name: 'Portfolio Template',
        description: 'Beautiful portfolio template to showcase your work',
        price: 69,
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
        category: 'Templates',
        rating: 4.9,
        inStock: true
    },
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={14}
                    className={`${star <= Math.floor(rating)
                        ? 'text-orange-400 fill-orange-400'
                        : star <= Math.ceil(rating)
                            ? 'text-orange-400 fill-orange-200'
                            : 'text-gray-300'
                        }`}
                />
            ))}
            <span className="text-sm text-gray-500 ml-1">{rating}</span>
        </div>
    );
}

// Product card component
function ProductCard({ product, index }: { product: Product; index: number }) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { ref, isVisible } = useFadeIn(index, 100);

    const openProduct = () => {
        setIsActive(true);

        setTimeout(() => {
            setIsActive(false);
            router.push(`/shop/${product.id}`);
        }, 120);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProduct();
        }
    };

    const handleWishlistClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        // Add wishlist logic here later.
    };

    const handleCartClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        router.push(`/shop/${product.id}`);
    };

    return (
        <div
            ref={ref}
            onClick={openProduct}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 cursor-pointer group ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
                } ${isActive ? 'ring-2 ring-teal-500 ring-opacity-50' : ''}`}
            style={{
                transform: isHovered && isVisible ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.3s ease, opacity 0.6s ease, transform 0.6s ease'
            }}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Out of stock badge */}
                {!product.inStock && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                    </span>
                )}

                {/* Category badge */}
                <span className="absolute top-3 right-3 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                    {product.category}
                </span>

                {/* Hover actions */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        type="button"
                        onClick={handleWishlistClick}
                        className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-colors"
                        aria-label={`Add ${product.name} to wishlist`}
                    >
                        <Heart size={16} className="text-gray-600 hover:text-red-500" />
                    </button>
                    <button
                        type="button"
                        onClick={handleCartClick}
                        className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center hover:bg-teal-600 shadow-md transition-colors"
                        aria-label={`Buy ${product.name}`}
                    >
                        <ShoppingCart size={16} className="text-white" />
                    </button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    </div>
                    <StarRating rating={product.rating} />
                </div>
            </div>
        </div>
    );
}

// Hero section
function HeroSection() {
    const { ref, inView } = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6 text-sm font-medium transform hover:scale-105 transition-transform duration-300">
                Shop
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4">
                My Digital Products
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                High-quality templates, UI kits, and digital assets to help you build amazing projects faster.
            </p>
        </div>
    );
}

// Category filter
function CategoryFilter({ selectedCategory, onSelect }: { selectedCategory: string; onSelect: (category: string) => void }) {
    const categories = ['All', 'Templates', 'UI Kits', 'Branding', 'Dashboards', 'Platforms'];

    return (
        <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

// Search bar
function SearchBar({ searchTerm, onSearch }: { searchTerm: string; onSearch: (term: string) => void }) {
    return (
        <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full max-w-md pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
        </div>
    );
}


export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white py-20 pb-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <HeroSection />

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                    <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </div>
                )
                }
            </div>
        </div>
    );
}
