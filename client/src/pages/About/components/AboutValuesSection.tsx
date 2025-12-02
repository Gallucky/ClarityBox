import { Lightbulb, Heart, Zap, Users } from "lucide-react";

const AboutValuesSection = () => {
    const values = [
        {
            icon: Lightbulb,
            title: "Simplicity",
            description: "Clean, intuitive design that gets out of your way",
        },
        {
            icon: Heart,
            title: "User-Centric",
            description: "Built with real user feedback and needs in mind",
        },
        {
            icon: Zap,
            title: "Performance",
            description: "Lightning-fast platform that respects your time",
        },
        {
            icon: Users,
            title: "Community",
            description: "Supporting collaboration and teamwork",
        },
    ];

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        These principles guide everything we do
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((value, idx) => (
                        <div
                            key={idx}
                            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center">
                            <value.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                            <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValuesSection;
