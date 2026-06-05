import { ChevronRight } from 'lucide-react';

interface Service {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    title: string;
    description: string;
    color: string;
}

interface ServicesSectionProps {
    services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
    return (
        <section id="services" className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4">What do I help?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        I will help you with finding a solution and solve your problem. I use process design to create digital products with unique ideas and build it.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                                    <IconComponent className="text-white" size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <a href="#" className="text-gray-900 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <ChevronRight size={20} />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
