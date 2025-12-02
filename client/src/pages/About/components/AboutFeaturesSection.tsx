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
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Key Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to stay organized and productive
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-border bg-card p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <feature.icon className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutFeaturesSection;
