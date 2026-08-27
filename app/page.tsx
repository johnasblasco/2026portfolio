'use client';
import { Mail, MapPin, Smartphone, Phone, Code, MonitorCog } from 'lucide-react';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import BarPoll from './components/BarPoll';

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
        title: 'Operations / Accounting',
        category: 'Web Design',
        image: '/hris.jpeg'
    },
 
    {
        title: 'B2B PADRELLOS CONSTRUCTION (Project Management, etc.)',
        category: 'Custom Software',
        image: '/padrellos.png'
    },
    {
        title: 'B2B JMJ SYSTEM (Parsing orders, inventory management, etc.)',
        category: 'Custom Software',
        image: '/jmj.jpeg'
    },
       {
        title: 'Goverment System',
        category: 'Custom Software',
         image: '/lgu.jpeg'
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
            <BarPoll />
            <Footer />
        </div>
    );
}
