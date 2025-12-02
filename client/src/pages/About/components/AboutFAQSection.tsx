const AboutFAQSection = () => {
    const faqs = [
        {
            q: "Is ClarityBox free to use?",
            a: "Yes! ClarityBox offers a free tier with all essential features. Premium features are available with a paid subscription.",
        },
        {
            q: "Can I collaborate with my team?",
            a: "Absolutely! You can invite team members to your projects and collaborate in real-time.",
        },
        {
            q: "Is my data secure?",
            a: "We take security seriously. All data is encrypted and stored securely on our servers.",
        },
        {
            q: "How do I export my data?",
            a: "You can export your projects and tasks in various formats from your account settings.",
        },
    ];

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300">
                            <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutFAQSection;
