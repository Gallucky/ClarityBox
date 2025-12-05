import { motion } from "framer-motion";
import { Code } from "lucide-react";

const AboutTechSection = () => {
    const techs = [
        { title: "React 19", label: "Modern UI framework" },
        { title: "TypeScript", label: "Type-safe development" },
        { title: "Tailwind CSS", label: "Beautiful styling" },
        { title: "MongoDB", label: "Flexible data storage" },
        { title: "Node.js", label: "Robust backend" },
        { title: "REST API", label: "Seamless integration" },
    ];

    return (
        <section className="relative flex w-full flex-col items-center justify-center">
            <div className="mb-6! flex flex-col items-center justify-center text-center max-sm:w-[90%]">
                <div className="flex min-h-20 items-center justify-center gap-3 max-sm:flex-col">
                    <Code className="text-primary size-12 align-middle" />
                    <h2 className="text-fluid-1.75! md:text-fluid-2.5! font-bold">
                        Built with Modern Tech
                    </h2>
                </div>
                <p className="text-muted-foreground text-fluid-1.25! mb-8">
                    ClarityBox is built using cutting-edge technologies to
                    ensure reliability, performance, and scalability.
                </p>
            </div>
            <div className="border-border bg-card mx-auto rounded-2xl border p-8!">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {techs.map((tech, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center select-none"
                        >
                            <span className="text-accent animate-tilt mb-1! self-start underline">
                                {tech.title}
                            </span>
                            <motion.div
                                whileHover={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-secondary/20 mt-2 flex w-full items-center gap-2 rounded-full border px-4! py-1!"
                            >
                                <div className="bg-primary size-2 shrink-0 rounded-full"></div>
                                <span className="text-outline text-outline-background font-poppins text-fluid-0.75! font-medium text-teal-400">
                                    {tech.label}
                                </span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTechSection;
