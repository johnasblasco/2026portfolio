'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

interface ContactInfo {
    icon: React.ReactNode;
    type: string;
    value: string;
    color: string;
}

interface ContactSectionProps {
    contactInfo: ContactInfo[];
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-5xl font-bold mb-6">Let's Work Together</h2>
                        <p className="text-gray-600 mb-8">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`${info.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">{info.type}</div>
                                        <div className="font-medium">{info.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a href="#" className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <FiGithub size={20} />
                            </a>
                            <a href="#" className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <FiLinkedin size={20} />
                            </a>
                            <a href="#" className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <FiTwitter size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    placeholder="Tell me about your project"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                                ></textarea>
                            </div>
                            <button className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
