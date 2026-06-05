'use client';
import { Mail, MapPin, Phone, Briefcase, Code, Palette } from 'lucide-react';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const services = [
    {
        icon: Code,
        title: 'Website Design',
        description: 'I created digital products with unique ideas use Figma & Framer',
        color: 'bg-teal-500'
    },
    {
        icon: Briefcase,
        title: 'Mobile App Design',
        description: 'I created digital products with unique ideas use Figma & Framer',
        color: 'bg-orange-500'
    },
    {
        icon: Palette,
        title: 'Brand Identity',
        description: 'I created digital products with unique ideas use Figma & Framer',
        color: 'bg-red-500'
    }
];

const projects = [
    {
        title: 'E-commerce Platform',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
        title: 'Mobile Banking App',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop'
    },
    {
        title: 'Brand Identity Design',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
    },
    {
        title: 'Dashboard Analytics',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    }
];

const experiences = [
    { years: '2020-2023', title: 'Senior UI/UX Designer', company: 'Tech Corp' },
    { years: '2018-2020', title: 'Product Designer', company: 'Design Studio' },
    { years: '2016-2018', title: 'Junior Designer', company: 'Creative Agency' }
];


const contactInfo = [
    { icon: <Mail size={20} />, type: 'Email', value: 'binjan@example.com', color: 'bg-teal-100' },
    { icon: <Phone size={20} />, type: 'Phone', value: '+1 (555) 123-4567', color: 'bg-orange-100' },
    { icon: <MapPin size={20} />, type: 'Location', value: 'San Francisco, CA', color: 'bg-red-100' }
];


export default function App() {


    return (
        <div className="min-h-screen bg-white">

            <Navigation />
            <HeroSection />
            <ServicesSection services={services} />
            <AboutSection experiences={experiences} />
            <PortfolioSection projects={projects} />
            <ContactSection contactInfo={contactInfo} />
            <Footer />
        </div>
    );
}
