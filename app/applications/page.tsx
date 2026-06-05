'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, BookOpen, Users, Calendar, LayoutDashboard, FileText, GraduationCap, ArrowLeft } from 'lucide-react';

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

const myApps = [
  {
    name: 'School Management System',
    description: 'Complete system for managing students, teachers, classes, and grades',
    icon: GraduationCap,
    color: 'bg-teal-500',
    href: '/projects/school-management',
    tag: 'Education',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop'
  },
  {
    name: 'Library System',
    description: 'Digital library management with book catalog and borrowing system',
    icon: BookOpen,
    color: 'bg-orange-500',
    href: '/projects/library',
    tag: 'Management',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=250&fit=crop'
  },
  {
    name: 'Student Portal',
    description: 'Online portal for students to view grades, attendance, and announcements',
    icon: Users,
    color: 'bg-red-500',
    href: '/projects/student-portal',
    tag: 'Portal',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop'
  },
  {
    name: 'Attendance Tracker',
    description: 'Real-time attendance tracking for schools and organizations',
    icon: Calendar,
    color: 'bg-blue-500',
    href: '/projects/attendance',
    tag: 'Tracking',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
  },
  {
    name: 'E-Learning Platform',
    description: 'Online learning platform with courses, quizzes, and progress tracking',
    icon: LayoutDashboard,
    color: 'bg-purple-500',
    href: '/projects/e-learning',
    tag: 'Education',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop'
  },
  {
    name: 'Report Generator',
    description: 'Automated report generation for school administrations',
    icon: FileText,
    color: 'bg-green-500',
    href: '/projects/reports',
    tag: 'Automation',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
  },
];

// Animated stat counter
function StatCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-gray-900">
        {count}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

// Ripple effect on click
function RippleEffect({ children }: { children: React.ReactNode }) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <div onClick={handleClick} className="relative overflow-hidden">
      {children}
      {ripple && (
        <span
          className="absolute rounded-full bg-teal-100 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '200px',
            height: '200px',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s linear',
          }}
        />
      )}
    </div>
  );
}

// Animated app card
function AppCard({ app, index }: { app: typeof myApps[0]; index: number }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { ref, isVisible } = useFadeIn(index, 100);
  const Icon = app.icon;

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => router.push(app.href), 100);
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <RippleEffect>
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-500 cursor-pointer group relative overflow-hidden ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
          } ${isActive ? 'ring-2 ring-teal-500 ring-opacity-50' : ''}`}
        style={{
          transform: isHovered && isVisible ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.3s ease, opacity 0.6s ease, transform 0.6s ease'
        }}
      >
        {/* Hover Image - appears behind content when hovered */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
          <img
            src={app.image}
            alt={app.name}
            className="w-full h-full object-cover scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          {/* Strong dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content overlay - sits above image, text changes to white on hover */}
        <div className="relative z-10 transition-all duration-300 group-hover:scale-[1.02] group-hover:text-white">
          {/* Icon with color background */}
          <div className="flex items-center justify-between mb-6">
            <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
              <Icon className="text-white" size={28} />
            </div>
            <span className="text-xs font-medium text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full group-hover:bg-white/90 group-hover:text-gray-700 transition-colors duration-300">
              {app.tag}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
            {app.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-100 transition-colors duration-300">
            {app.description}
          </p>

          {/* Arrow indicator */}
          <div className="absolute -bottom-2 -right-2 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md group-hover:bg-white">
              <ChevronRight size={24} />
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      </div>
    </RippleEffect>
  );
}

// Animated hero section
function HeroSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6 text-sm font-medium transform hover:scale-105 transition-transform duration-300">
        My Applications
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4">
        Applications I've Built
      </h1>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        A collection of web applications I've developed for various clients and projects,
        showcasing my full-stack development capabilities.
      </p>

      {/* Stats with animation */}
      <div className="flex justify-center gap-8 mt-8">
        <StatCounter end={myApps.length} suffix="+" label="Applications" />
        <StatCounter end={6} label="Technologies" />
        <StatCounter end={100} suffix="%" label="Custom Built" />
      </div>
    </div>
  );
}


export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Applications Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myApps.map((app, index) => (
            <AppCard key={index} app={app} index={index} />
          ))}
        </div>


      </div>
    </div>
  );
}
