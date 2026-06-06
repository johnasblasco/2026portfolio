'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './image/ImageWithFallback';

const stats = [
    { value: 5, suffix: '+', label: 'Years of Experience' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 100, suffix: '+', label: 'Happy Clients' },
    { value: 10, suffix: '+', label: 'Certificates Earned' }
];

// smooth counter hook
function useCountUp(end: number, start = 0, duration = 1500, shouldStart = false) {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);

            // ease-out effect
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * (end - start) + start));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, start, duration, shouldStart]);

    return count;
}

// stat component
function StatCounter({
    value,
    suffix,
    startAnimation
}: {
    value: number;
    suffix: string;
    startAnimation: boolean;
}) {
    const count = useCountUp(value, 0, 1500, startAnimation);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export function HeroSection() {
    const statsRef = useRef<HTMLDivElement | null>(null);
    const [start, setStart] = useState(false);
    const heroImages = [
        "/transparent-hero.png",
        "/hero-2.png",
        "/hero-3.png",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // trigger animation when stats enter view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStart(true);
                }
            },
            { threshold: 0.4 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleDownloadCV = () => {
        const link = document.createElement("a");
        link.href = "/UPDATED.pdf";
        link.download = "UPDATED.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section
            id="home"
            className="relative pt-8 pb-12 lg:pb-16 px-4 sm:px-6 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* CONTENT */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
                            Hey There 👋
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6">
                            Hey There,
                            <br />
                            I'm{' '}
                            <span className="relative inline-block">
                                Johnas
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 20"
                                    fill="none"
                                >
                                    <path
                                        d="M5 15Q50 5 100 10T195 15"
                                        stroke="#14b8a6"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 max-w-xl">
                            A Full Stack Developer, skilled player known for his
                            ability to adapt evolving technologies.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="cursor-pointer w-full sm:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                                View Portfolio
                                <ChevronRight size={20} />
                            </button>

                            <button onClick={handleDownloadCV} className="cursor-pointer w-full sm:w-auto border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                                Download CV
                            </button>
                        </div>
                    </div>

                    {/* IMAGE */}
                    {/* IMAGE SLIDESHOW */}
                    <div className="relative order-1 lg:order-2 max-w-md lg:max-w-lg mx-auto w-full">
                        <div className="absolute -top-6 -left-6 lg:-top-10 lg:-left-10 w-24 h-24 lg:w-40 lg:h-40 bg-orange-400 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-20 h-20 lg:w-32 lg:h-32 bg-teal-400 rounded-full opacity-20"></div>

                        <div className="relative bg-linear-to-br from-orange-100 to-orange-50 rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
                            {[
                                "/transparent-hero.png",
                                "/hero-2.png",
                                "/hero-3.png",
                            ].map((image, index) => (
                                <ImageWithFallback
                                    key={image}
                                    src={image}
                                    alt="Profile"
                                    className={`rounded-2xl w-full max-h-137.5 object-cover transition-opacity duration-700 ${index === currentSlide
                                            ? "opacity-100"
                                            : "opacity-0 absolute inset-4 sm:inset-6 lg:inset-8 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                {/* STATS */}
                <div
                    ref={statsRef}
                    className=" grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-xl"
                        >
                            <div className="  text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                <StatCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    startAnimation={start}
                                />
                            </div>

                            <div className="text-sm sm:text-base text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-40 left-0 w-full h-36">

                {/* main fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/90 via-gray-100/60 to-transparent" />

                {/* soft fog depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(180,180,180,0.25),transparent_70%)] blur-2xl" />
            </div>
        </section>
    );
}