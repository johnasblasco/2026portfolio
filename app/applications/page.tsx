'use client';

import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import {
    Search,
    Sparkles,
    GraduationCap,
    HandCoins,
    Calendar,
    LayoutDashboard,
    FileText,
    Clapperboard,
    Bot,
    ArrowUpRight,
    LayoutGrid,
} from 'lucide-react';

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
interface AppItem {
    id: string;
    name: string;
    tagline: string;
    description: string;
    href: string;
    external: boolean;
    tag: string;
    icon: React.ElementType;
    color: string;
    image: string;
    badge?: string;
}

// ─── Applications ────────────────────────────────────────────────────────────
const myApps: AppItem[] = [
    {
        id: 'certificate-generator',
        name: 'Certificate Generator',
        tagline: 'Create & customize certificates',
        description: 'Demo Certificate Generator for educational purposes.',
        icon: GraduationCap,
        color: 'from-teal-400 to-teal-600',
        href: 'https://free-certificate-editor.vercel.app/',
        external: true,
        tag: 'Education',
        badge: 'Live Demo',
        image: '/project1.png',
    },
    {
        id: 'ai-video-clipping',
        name: 'AI Video Clipping',
        tagline: 'Auto-cut highlights from long videos',
        description: 'AI-powered tool that finds the best moments in long footage and clips them into shareable shorts automatically.',
        icon: Clapperboard,
        color: 'from-orange-400 to-orange-600',
        href: 'https://opus-alternative.lovable.app/studio',
        external: false,
        tag: 'AI',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
    },
    {
        id: 'ai-chatbot',
        name: 'AI Chatbot',
        tagline: 'Conversational assistant for any site',
        description: 'Embeddable AI chatbot that answers questions, handles support queries, and learns from your content in real time.',
        icon: Bot,
        color: 'from-indigo-400 to-indigo-600',
        href: 'https://incognito-chat-bot.lovable.app/c/yxr9z1yi',
        external: false,
        tag: 'AI',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    },
    {
        id: 'expense-tracker',
        name: 'Expense Tracker',
        tagline: 'Personal finance made simple',
        description: 'Simple expense tracking application for personal finance management.',
        icon: HandCoins,
        color: 'from-green-400 to-green-600',
        href: 'https://personal-money-tracker-red.vercel.app',
        external: true,
        tag: 'Finance',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop',
    },
    {
        id: 'attendance-tracker',
        name: 'Attendance Tracker',
        tagline: 'Real-time check-ins & reports',
        description: 'Real-time attendance tracking for schools and organizations.',
        icon: Calendar,
        color: 'from-blue-400 to-blue-600',
        href: '/projects/attendance',
        external: false,
        tag: 'Tracking',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    },
    {
        id: 'e-learning-platform',
        name: 'E-Learning Platform',
        tagline: 'Courses, quizzes & progress',
        description: 'Online learning platform with courses, quizzes, and progress tracking.',
        icon: LayoutDashboard,
        color: 'from-purple-400 to-purple-600',
        href: '/projects/e-learning',
        external: false,
        tag: 'Education',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop',
    },
    {
        id: 'report-generator',
        name: 'Report Generator',
        tagline: 'Automated school admin reports',
        description: 'Automated report generation for school administrations.',
        icon: FileText,
        color: 'from-emerald-400 to-emerald-600',
        href: '/projects/reports',
        external: false,
        tag: 'Automation',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    },
];

const tags = ['All', ...Array.from(new Set(myApps.map((a) => a.tag)))];

const badgeColors: Record<string, string> = {
    'Live Demo': 'bg-teal-50 text-teal-700 border-teal-200',
};

// ─── App Card ────────────────────────────────────────────────────────────────
function AppCard({ app, index }: { app: AppItem; index: number }) {
    const router = useRouter();
    const { ref, isVisible } = useFadeIn(index, 80);
    const Icon = app.icon;

    const openApp = () => {
        if (app.external) {
            window.open(app.href, '_blank', 'noopener,noreferrer');
        } else {
            router.push(app.href);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApp(); }
    };

    return (
        <div
            ref={ref}
            onClick={openApp}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Open ${app.name}`}
            className={`group bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-100 hover:border-gray-200
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: isVisible ? '0ms' : `${index * 80}ms` }}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10`} />
                <ImageWithFallback
                    src={app.image}
                    alt={app.name}
                    className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Tag pill */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gray-200">
                    {app.tag}
                </span>

                {/* Badge */}
                {app.badge && (
                    <span className={`absolute top-4 right-4 text-[10px] font-semibold px-3 py-1.5 rounded-full border ${badgeColors[app.badge]}`}>
                        {app.badge}
                    </span>
                )}

                {/* Hover action */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center shadow-sm">
                        <ArrowUpRight size={14} className="text-white" />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                        <Icon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 leading-snug truncate">
                            {app.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">{app.tagline}</p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{app.description}</p>

                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Open App
                    </span>
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </div>
            </div>
        </div>
    );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
    const { ref, inView } = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6 w-fit">
                <Sparkles size={12} />
                <span className="text-xs font-semibold">My Applications</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                        Apps I&apos;ve
                        <br />
                        <span className="text-teal-400 font-normal">Built & Shipped</span>
                    </h1>
                    <p className="text-gray-500 text-base lg:text-lg max-w-xl">
                        A free collection of web applications I&apos;ve developed for various clients and projects.
                    </p>

                    <button
                        onClick={() => document.querySelector('#apps-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-8 cursor-pointer bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-fit"
                    >
                        Explore Apps
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-6 lg:gap-8 flex-shrink-0">
                    {[
                        { value: `${myApps.length}`, label: 'Applications' },
                        { value: `${tags.length - 1}`, label: 'Categories' },
                        { value: '100%', label: 'Custom Built' },
                    ].map((s) => (
                        <div key={s.label} className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Search Bar ──────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
                type="text"
                placeholder="Search applications..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full sm:w-80 pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-all shadow-sm"
            />
        </div>
    );
}

// ─── Tag Filter ──────────────────────────────────────────────────────────────
function TagFilter({ selected, onSelect }: { selected: string; onSelect: (t: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onSelect(tag)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 border cursor-pointer
            ${selected === tag
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
    const [selectedTag, setSelectedTag] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = myApps.filter((app) => {
        const matchesTag = selectedTag === 'All' || app.tag === selectedTag;
        const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.tagline.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Hero */}
                <HeroSection />

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    <TagFilter selected={selectedTag} onSelect={setSelectedTag} />
                </div>

                {/* Results count */}
                <p className="text-xs text-gray-400 mb-6">
                    {filtered.length} application{filtered.length !== 1 ? 's' : ''} found
                    {selectedTag !== 'All' && <> in <span className="text-gray-600 font-medium">{selectedTag}</span></>}
                </p>

                {/* Grid */}
                <div id="apps-grid">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((app, index) => (
                                <AppCard key={app.id} app={app} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <LayoutGrid size={24} className="text-gray-300" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-800 mb-1">No applications found</h3>
                            <p className="text-sm text-gray-400">Try a different search or category.</p>
                        </div>
                    )}
                </div>

                {/* Footer note */}
                <p className="pb-40 text-center text-xs text-gray-500 mt-16">
                    All applications are free to try · Built with modern web tech · More coming soon
                </p>
            </div>
        </div>
    );
}
