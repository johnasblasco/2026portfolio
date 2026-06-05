'use client';
import { Mail, MapPin, Smartphone, Phone, Code, MonitorCog } from 'lucide-react';

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
        title: 'Web Application ',
        description: 'Website system is a software application that runs on a web server and is accessed through a web browser. It provides various functionalities such as content management, e-commerce, social networking, and more.',
        color: 'bg-teal-500'
    },
    {
        icon: Smartphone,
        title: 'Mobile Application',
        description: 'Mobile applications are software applications that are designed to run on mobile devices such as smartphones and tablets. They provide a range of functionalities from simple utilities to complex business solutions.',
        color: 'bg-orange-500'
    },
    {
        icon: MonitorCog,
        title: 'Custom Software',
        description: 'Custom software development involves creating tailored solutions that meet specific business needs. I specialize in building robust, scalable applications that drive efficiency and growth. eg B2B, ERP...',
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
    { years: 'JAN 2026 - PRESENT', title: 'Senior Developer', company: 'C8nnect IT Solutions' },
    { years: 'JUL 2025 - JAN 2025', title: 'Junior Developer', company: 'SNL Virtual Partner' },
    { years: 'JAN 2025 - MAY 2025', title: 'Intern (Entry Level) Developer', company: 'Simplevia Technologies inc.' }
];


const contactInfo = [
    { icon: <Mail size={20} />, type: 'Email', value: 'johnaslblasco@gmail.com', color: 'bg-teal-100' },
    { icon: <Phone size={20} />, type: 'Phone', value: '+63 (985) 926-8228', color: 'bg-orange-100' },
    { icon: <MapPin size={20} />, type: 'Location', value: 'City of Malolos, Bulacan', color: 'bg-red-100' }
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
