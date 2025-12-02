import { Target, Award } from "lucide-react";

const AboutMissionSection = () => {
    return (
        <section className="relative flex w-[90dvw] max-w-[95%] flex-col items-center justify-center text-center">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-primary/10 text-primary font-inter inline-flex items-center gap-2 rounded-full px-4! py-1! font-semibold">
                        <Target size={16} />
                        <span className="text-fluid-0.75!">Our Mission</span>
                    </div>
                    <h2 className="text-fluid-1.5! font-inter mx-auto font-bold">
                        Bringing Clarity to Your Work
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        In a world full of distractions and endless to-do lists,
                        it's easy to lose sight of what truly matters. Our
                        mission is to provide a simple yet powerful platform
                        that helps you:
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Organize your projects and tasks efficiently",
                            "Collaborate seamlessly with your team",
                            "Track your progress and celebrate wins",
                            "Cultivate gratitude and mindfulness",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <div className="bg-primary/20 mt-1 rounded-full p-1">
                                    <Award
                                        size={"1.5rem"}
                                        className="text-primary"
                                    />
                                </div>
                                <span className="text-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative hidden lg:block">
                    <div className="about-mission-visual relative h-96 w-full">
                        <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-2xl bg-gradient-to-br blur-3xl"></div>
                        <div className="border-primary/20 bg-card/50 relative flex h-full w-full flex-col justify-between rounded-2xl border p-8 backdrop-blur-sm">
                            <div className="space-y-3">
                                <div className="bg-primary/30 h-2 w-2/3 rounded-full"></div>
                                <div className="bg-secondary/30 h-2 w-full rounded-full"></div>
                                <div className="bg-primary/20 h-2 w-3/4 rounded-full"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-primary/20 h-8 w-8 rounded-lg"></div>
                                <div className="bg-secondary/20 h-8 w-8 rounded-lg"></div>
                                <div className="bg-primary/20 h-8 w-8 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMissionSection;
