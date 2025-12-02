import { Code } from "lucide-react";

const AboutTechSection = () => {
    const techs = [
        "React 19 - Modern UI framework",
        "TypeScript - Type-safe development",
        "Tailwind CSS - Beautiful styling",
        "MongoDB - Flexible data storage",
        "Node.js - Robust backend",
        "REST API - Seamless integration",
    ];

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Code className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold">Built with Modern Tech</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-8">
                        ClarityBox is built using cutting-edge technologies to ensure
                        reliability, performance, and scalability.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {techs.map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-foreground">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTechSection;
