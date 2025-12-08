import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/shadcn/button";

const HomeCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="font-montserrat relative w-[90dvw]">
            <div className="border-primary/20 from-primary/10 to-secondary/10 flex flex-col items-center justify-center gap-3 rounded-2xl border bg-linear-to-r p-8! text-center">
                <h2 className="text-fluid-2! font-bold">
                    Ready to Get Started?
                </h2>
                <p className="text-muted-foreground text-fluid! mx-auto max-w-2xl">
                    Join thousands of users who are already organizing their
                    work with ClarityBox. Sign up today and start your free
                    trial.
                </p>
                <div className="mt-6! flex h-[50px] items-center justify-center gap-3">
                    <Button
                        onClick={() => navigate("/registration")}
                        className="bg-primary hover:bg-primary/90 gap-2 rounded-2xl px-2!"
                        size="lg"
                    >
                        Create Account
                        <ArrowRight size={18} />
                    </Button>
                    <Button
                        onClick={() => navigate("/about")}
                        variant="outline"
                        size="lg"
                        className="rounded-2xl px-2!"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
