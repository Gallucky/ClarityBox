import { motion } from "framer-motion";
import { Target, Zap, Heart, Users } from "lucide-react";

const AboutFeaturesSection = () => {
    const features = [
        {
            title: "Project Management",
            description:
                "Create, organize, and manage your projects with ease. Track progress and collaborate with your team.",
            icon: Target,
        },
        {
            title: "Task Tracking",
            description:
                "Break down your projects into actionable tasks. Set priorities, deadlines, and track completion.",
            icon: Zap,
        },
        {
            title: "Gratitude Boxes",
            description:
                "Cultivate positivity by recording moments of gratitude. Reflect on your wins and celebrate progress.",
            icon: Heart,
        },
        {
            title: "Collaboration",
            description:
                "Work together with your team members. Share projects, assign tasks, and communicate seamlessly.",
            icon: Users,
        },
    ];

    return (
        <section className="relative w-full">
            <div className="mb-12! flex flex-col items-center justify-center text-center">
                <h2 className="text-fluid-2.5! font-bold tracking-tight">
                    Key Features
                </h2>
                <p className="text-muted-foreground text-fluid-1.25! mx-auto max-w-2xl">
                    Everything you need to stay organized and productive
                </p>
            </div>
            <div className="mx-auto! grid w-[90%] gap-8 overflow-clip perspective-midrange md:grid-cols-2 lg:w-1/2">
                {features.map((feature, idx) => (
                    <motion.div
                        whileHover={{
                            skewX: 15,
                            rotateX: 15,
                            rotateY: 15,
                            scale: 0.75,
                            transition: { duration: 0.3 },
                        }}
                        style={{ perspective: 1000 }}
                        key={idx}
                    >
                        <div className="border-border bg-card hover:border-primary/50 mx-auto! h-full max-h-[300px] w-full max-w-[600px] rounded-[calc(0.25rem+4px)] border p-8! transition-all duration-300 select-none transform-3d hover:shadow-lg">
                            <feature.icon className="text-primary h-12 w-12" />
                            <h3 className="mb-3 text-xl font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AboutFeaturesSection;
