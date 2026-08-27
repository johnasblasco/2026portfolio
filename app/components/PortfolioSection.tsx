'use client';

import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './image/ImageWithFallback';

interface Project {
    title: string;
    category: string;
    image: string;
}

interface PortfolioSectionProps {
    projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
    return (
        <section id="portfolio" className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4">Business System Showcase</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A selection of my recent work across various domains including web design, mobile apps, and branding.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                            <div className="relative w-full h-80">
                                <ImageWithFallback
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"


                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="text-sm text-orange-400 mb-2">{project.category}</div>
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <button className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
                                        View Project <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
