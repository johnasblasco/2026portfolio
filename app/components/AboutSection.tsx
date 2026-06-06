interface Experience {
    years: string;
    title: string;
    company: string;
}

interface AboutSectionProps {
    experiences: Experience[];
}

export function AboutSection({ experiences }: AboutSectionProps) {
    return (
        <section id="about" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-5xl font-bold mb-6">My Work Experience</h2>
                        <p className="text-gray-600 mb-8">
                            I have been working as a Programmer for about a year now, but my experience of developing is over a 5years including my senior high school and college, I had the opportunity to collaborate with teams from various industries to create exceptional digital experiences.
                        </p>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={index} className="border-l-4 border-teal-500 pl-6">
                                    <div className="text-sm text-gray-500 mb-1">{exp.years}</div>
                                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                                    <div className="text-gray-600">{exp.company}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-5xl font-bold mb-6">My Latest Works</h2>
                        <p className="text-gray-600 mb-8">
                            Here are some of my recent projects that showcase my skills in UI/UX design, branding, and digital product development.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
                                <div className="text-4xl font-bold mb-2">95%</div>
                                <div>B2B / Custom software for business process</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <div>Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
