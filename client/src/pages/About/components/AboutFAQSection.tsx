const AboutFAQSection = () => {
    const faqs = [
        {
            q: "Is ClarityBox free to use?",
            a: "Yes! ClarityBox offers a free tier with all essential features.",
        },
        {
            q: "Can I collaborate with my team?",
            a: "Currently no, but we're working on it! In the future, you'll be able to invite members to your projects and collaborate in real-time.",
        },
        {
            q: "Is my data secure?",
            a: "We take security seriously. Your password and most sensitive data is encrypted and stored securely on our servers.",
        },
        {
            q: "How do I export my data?",
            a: "We're working on it! In the future, you'll be able to export your data in various formats, such as CSV or JSON, to help you keep your thoughts organized and accessible in different formats.",
        },
    ];

    return (
        <section className="relative w-[90dvw] lg:w-2/3">
            <div className="mb-12 text-center">
                <h2 className="mb-4! font-bold tracking-tight">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="cursor-default space-y-6 rounded-2xl *:first:rounded-t-2xl *:last:rounded-b-2xl">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="border-border bg-card hover:border-primary/50 border px-4! py-3! transition-all duration-300"
                    >
                        <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                        <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutFAQSection;
