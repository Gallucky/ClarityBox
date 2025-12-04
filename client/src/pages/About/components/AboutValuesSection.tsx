import { motion } from "framer-motion";
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
        <section className="relative w-full">
            <div className="mb-6! flex flex-col items-center justify-center">
                <h2 className="text-fluid-2.5! mb-4 text-center font-bold tracking-tight">
                    Our Core Values
                </h2>
                <p className="text-muted-foreground text-fluid-1.25! mx-auto w-[90%] max-w-2xl text-center">
                    These principles guide everything we do
                </p>
            </div>

            <div className="mx-auto! grid grid-cols-1 gap-6 select-none lg:w-1/2 lg:grid-cols-2">
                {values.map((value, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="border-border bg-card hover:border-primary/50 mx-auto! w-full max-w-[90%] place-items-center items-center justify-center rounded-[calc(0.25rem+4px)] border px-12! py-6! text-center transition-all duration-300 hover:shadow-lg lg:max-w-[500px]"
                    >
                        <value.icon className="text-primary size-10 transition-transform group-hover:scale-110" />
                        <h3 className="text-fluid-1.5 font-semibold">
                            {value.title}
                        </h3>
                        <p className="text-muted-foreground text-fluid! max-w-[80%]">
                            {value.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AboutValuesSection;
