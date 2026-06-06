'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, Download, User, Star, Briefcase, Book, Palette, Code, Database, Server, Braces, Zap } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface MousePos { x: number; y: number }
interface Rot { x: number; y: number }

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = ref.current;
            if (!el) return;
            const { top, height } = el.getBoundingClientRect();
            const scrollable = height - window.innerHeight;
            if (scrollable <= 0) return;
            setProgress(Math.max(0, Math.min(1, -top / scrollable)));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [ref]);
    return progress;
}

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return inView;
}

// ─── AnimatedCard ────────────────────────────────────────────────────────────

interface AnimatedCardProps {
    children: React.ReactNode;
    delay?: number;
}

const AnimatedCard = ({ children, delay = 0 }: AnimatedCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<HTMLElement>);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms`, perspective: 600 }}
            className={[
                "bg-white border border-gray-100 rounded-3xl p-8 mb-8",
                "shadow-sm transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                "origin-top",
                "hover:-translate-y-1 hover:shadow-xl hover:border-gray-200",
                inView
                    ? "opacity-100 translate-y-0 rotate-x-0"
                    : "opacity-0 translate-y-10 [transform:translateY(40px)_rotateX(8deg)]",
            ].join(" ")}
        >
            {children}
        </div>
    );
};

// ─── Small reusable pieces ────────────────────────────────────────────────────

const SectionLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-5 py-2.5 rounded-full mb-6 border border-gray-100">
        {icon}
        {text}
    </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {children}
    </h2>
);

const Divider = () => (
    <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full mb-6" />
);

const SectionBody = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-gray-500 leading-relaxed text-base ${className}`}>
        {children}
    </p>
);

// ─── Static data ────────────────────────────────────────────────────────────

const SKILLS = [
    { label: "React / React Native", icon: Star, accent: true },
    { label: "TypeScript", icon: Star, accent: true },
    { label: "Node.js", icon: Server, accent: true },
    { label: "Next.js", icon: Code, accent: true },
    { label: "Tailwind", icon: Palette, accent: true },
    { label: "API", icon: Braces, accent: true },
    { label: "PostgreSQL", icon: Database, accent: true },
    { label: "AWS", icon: Server, accent: false },
    { label: "Docker", icon: Server, accent: false },
    { label: "Figma", icon: Palette, accent: false },
    { label: "Python", icon: Code, accent: false },
    { label: "Redis", icon: Database, accent: false },
];

const EXPERIENCE = [
    {
        role: "Fullstack Developer / Senior role",
        company: "c8nnect IT Solutions",
        period: "2025 - 2026",
        desc: "Led projects and infrastructure, improved build performance by 40%, mentored 4 junior engineers and interns.",
        dotColor: "bg-teal-500",
    },
    {
        role: "Frontend Dev",
        company: "SNL virtual Partner",
        period: "2025 - 2025",
        desc: "Built many generic and b2b applications using Typescript and React.",
        dotColor: "bg-orange-500",
    },
    {
        role: "Backend Engineer",
        company: "Simplevia technologies inc.",
        period: "2024 - 2025",
        desc: "Contributed to Accounting infomation system and helped migrate legacy codes",
        dotColor: "bg-gray-400",
    },
];

const PROJECTS = [
    { icon: "🧩", title: "DesignOS", desc: "A token-based design system with live preview and code export" },
    { icon: "⚡", title: "Quickflow", desc: "CLI tool that scaffolds full-stack apps in under 30 seconds" },
    { icon: "🌿", title: "Leaflog", desc: "Plant care tracker with ML-driven watering reminders" },
    { icon: "📊", title: "Metrics.sh", desc: "Open-source analytics dashboard for indie developers" },
];

// ─── Profile Image Component ─────────────────────────────────────────────────

const ProfileImage = ({ scrollProgress }: { scrollProgress: number }) => {
    const scrollRotY = scrollProgress * 12;
    const scrollRotX = Math.sin(scrollProgress * Math.PI) * -5;
    const scrollScale = 1 + scrollProgress * 0.04;
    const scrollTY = scrollProgress * -20;

    const portraitStyle: React.CSSProperties = {
        transform: `rotateX(${scrollRotX}deg) rotateY(${scrollRotY}deg) scale(${scrollScale}) translateY(${scrollTY}px)`,
        boxShadow: `0 ${20 + scrollProgress * 20}px ${60 + scrollProgress * 40}px rgba(0,0,0,${(0.1 + scrollProgress * 0.06).toFixed(3)})`,
    };

    return (
        <div
            style={portraitStyle}
            className="w-full h-full rounded-3xl overflow-hidden [transform-style:preserve-3d] will-change-transform transition-shadow duration-300"
        >
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden relative">
                <img
                    src="/me.jpeg"
                    alt="Johnas - Profile"
                    className="w-full h-full object-cover"
                />
                {/* Name badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 whitespace-nowrap shadow-lg border border-white/80">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight m-0">
                        Johnas
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-teal-600 font-medium mt-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                        Available for work
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─── Profile (main export) ──────────────────────────────────────────────────

export default function Profile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const portraitWrap = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef as React.RefObject<HTMLElement>, 0.1);
    const scrollProgress = useScrollProgress(containerRef as React.RefObject<HTMLElement>);

    // Mouse-tracking 3D tilt
    const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [currentRot, setCurrentRot] = useState<Rot>({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = portraitWrap.current?.getBoundingClientRect();
        if (!rect) return;
        setMouse({
            x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
            y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        });
    }, []);

    useEffect(() => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const tick = () => {
            setCurrentRot(prev => ({
                x: lerp(prev.x, isHovering ? -mouse.y * 10 : 0, 0.08),
                y: lerp(prev.y, isHovering ? mouse.x * 14 : 0, 0.08),
            }));
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isHovering, mouse]);

    const scrollHintOpacity = Math.max(0, (1 - scrollProgress * 5) * 0.45);

    return (
        <div ref={containerRef} className="bg-gray-50 min-h-screen text-gray-900">
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 pb-20">

                {/* LEFT COLUMN - Portrait */}
                <div className="w-[340px] shrink-0 sticky top-8 self-start h-[calc(100vh-40px)] max-h-[560px] flex flex-col items-center justify-center pr-8">

                    {/* Portrait wrapper - mouse tracking */}
                    <div
                        ref={portraitWrap}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="w-[260px] h-[340px] cursor-pointer"
                        style={{ perspective: 900 }}
                    >
                        <ProfileImage scrollProgress={scrollProgress} />
                    </div>

                    {/* Scroll hint */}
                    <div
                        className="mt-6 flex flex-col items-center gap-2 transition-opacity duration-200"
                        style={{ opacity: scrollHintOpacity }}
                    >
                        <div className="w-1 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
                            <span className="w-0.5 h-0.5 rounded-full bg-gray-400 animate-bounce" />
                        </div>
                        <span className="text-xs tracking-widest uppercase text-gray-500">Scroll</span>
                    </div>
                </div>

                {/* RIGHT COLUMN - Content */}
                <div className="flex-1 pl-4 pt-6 pb-20">

                    {/* Hero intro */}
                    <div
                        ref={heroRef}
                        className={[
                            "pb-8 transition-all duration-700 ease-out",
                            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                        ].join(" ")}
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2.5 rounded-full mb-6 text-sm font-medium border border-orange-200">
                            <Zap size={14} />
                            Full-Stack Developer
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                            Crafting digital
                            <br />
                            experiences with <em className="italic text-teal-600">intent</em>
                        </h1>
                        <p className="text-gray-500 text-base lg:text-lg mb-8 lg:mb-10 max-w-xl">
                            I build products that are fast, beautiful, and thoughtfully engineered -
                            from pixel-perfect interfaces to scalable backend systems.
                        </p>
                        <div className="flex gap-4">
                            <button className="cursor-pointer bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
                                View my work
                                <ChevronRight size={18} />
                            </button>
                            <a href="/UPDATED.pdf" target="_blank" rel="noopener noreferrer">
                                <button className="cursor-pointer inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 rounded-full px-6 py-3 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                    <Download size={18} />
                                    Resume
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* About */}
                    <AnimatedCard delay={0}>
                        <SectionLabel icon={<User size={16} />} text="About" />
                        <SectionTitle>Building with craft & purpose</SectionTitle>
                        <Divider />
                        <SectionBody>
                            I'm a full-stack developer with 6 years of coding experience and 1 year of work experience, turning ambitious ideas
                            into polished products. I care deeply about the intersection of engineering
                            and design - believing the best software is invisible, intuitive, and
                            delightful to use.
                        </SectionBody>
                        <SectionBody className="mt-4">
                            Currently based in Bulacan, I work with early-stage startups and
                            established teams who value quality and speed in equal measure.
                        </SectionBody>
                    </AnimatedCard>

                    {/* Skills */}
                    <AnimatedCard delay={60}>
                        <SectionLabel icon={<Star size={16} />} text="Skills" />
                        <SectionTitle>Technical toolkit</SectionTitle>
                        <Divider />
                        <SectionBody className="mb-6">
                            Proficient across the full stack, with a strong focus on React ecosystems,
                            Node.js, and cloud infrastructure.
                        </SectionBody>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {SKILLS.map(skill => {
                                const IconComponent = skill.icon;
                                return (
                                    <div
                                        key={skill.label}
                                        className={[
                                            "rounded-2xl p-5 text-center transition-all duration-200 cursor-default",
                                            "border hover:-translate-y-1 hover:shadow-lg",
                                            skill.accent
                                                ? "bg-orange-50 border-orange-200 text-orange-700"
                                                : "bg-white border-gray-100 text-gray-700",
                                        ].join(" ")}
                                    >
                                        <IconComponent className="w-6 h-6 mx-auto mb-2" />
                                        <span className="text-sm font-medium">{skill.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </AnimatedCard>

                    {/* Experience */}
                    <AnimatedCard delay={120}>
                        <SectionLabel icon={<Briefcase size={16} />} text="Experience" />
                        <SectionTitle>Where I've worked</SectionTitle>
                        <Divider />
                        <div className="flex flex-col gap-6">
                            {EXPERIENCE.map((exp, i) => (
                                <div key={exp.company} className="flex gap-4">
                                    {/* Timeline dot + connector line */}
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${exp.dotColor}`} />
                                        {i < EXPERIENCE.length - 1 && (
                                            <div className="w-px flex-1 bg-gray-100 mt-1 min-h-8" />
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div className="pb-1">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                            {exp.role} <span className="text-teal-600 font-medium">- {exp.company}</span>
                                        </h4>
                                        <p className="text-sm text-gray-400 mb-1">{exp.period}</p>
                                        <span className="text-sm text-gray-500 leading-relaxed">{exp.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedCard>

                    {/* Projects */}
                    <AnimatedCard delay={180}>
                        <SectionLabel icon={<Book size={16} />} text="Projects" />
                        <SectionTitle>Selected work</SectionTitle>
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PROJECTS.map((proj, i) => (
                                <div
                                    key={proj.title}
                                    className="relative bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-200 hover:border-teal-300 hover:-translate-y-1 hover:shadow-xl group"
                                >
                                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                                        {proj.icon}
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900 mb-2">{proj.title}</p>
                                    <p className="text-sm text-gray-500">{proj.desc}</p>
                                    {/* Arrow */}
                                    <div className="absolute top-6 right-6 text-teal-500 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedCard>

                </div>
            </div>
        </div>
    );
}
