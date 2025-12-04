const AboutHeroSection = () => {
    return (
        <section className="relative flex w-[90dvw] max-w-[95%] flex-col items-center justify-center text-center">
            <h1 className="mb-4! font-bold tracking-tight">
                <span className="text-fluid-3! from-primary to-secondary bg-linear-to-r bg-clip-text leading-2.5 text-transparent">
                    About ClarityBox
                </span>
            </h1>
            <p className="text-muted-foreground text-fluid-1.25! mx-auto max-w-3xl">
                We believe that clarity leads to productivity. ClarityBox is
                designed to help you organize your thoughts, manage your
                projects, and cultivate gratitude in your daily life.
            </p>
        </section>
    );
};

export default AboutHeroSection;
