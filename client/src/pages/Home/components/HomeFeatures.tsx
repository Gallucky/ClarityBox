import { Zap, Users, CheckCircle2 } from "lucide-react";

const HomeFeatures = () => {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description:
                "Experience blazing-fast performance with our optimized platform",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Work together seamlessly with your team on projects",
        },
        {
            icon: CheckCircle2,
            title: "Task Management",
            description:
                "Keep track of all your tasks and projects in one place",
        },
    ];

    return (
        <section className="font-montserrat relative w-[90dvw]">
            <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-fluid-2! font-bold">
                    Why Choose ClarityBox?
                </h2>
                <p className="text-muted-foreground text-fluid! mx-auto max-w-2xl">
                    Powerful features designed to help you stay organized and
                    productive
                </p>
            </div>
            <div className="grid gap-6 p-6! select-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group border-border bg-card hover:border-primary/50 rounded-xl border p-6! transition-all duration-300 ease-in-out hover:shadow-lg"
                    >
                        <feature.icon className="text-primary mb-4 size-10 transition-transform group-hover:scale-110" />
                        <h3 className="mb-2 font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
