import { Zap, Users, CheckCircle2 } from "lucide-react";

const HomeFeatures = () => {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Experience blazing-fast performance with our optimized platform",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Work together seamlessly with your team on projects",
        },
        {
            icon: CheckCircle2,
            title: "Task Management",
            description: "Keep track of all your tasks and projects in one place",
        },
    ];

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Why Choose ClarityBox?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to help you stay organized and productive
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <feature.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeFeatures;
