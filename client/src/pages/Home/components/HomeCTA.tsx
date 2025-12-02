import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

const HomeCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 sm:p-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are already organizing their work with
                        ClarityBox. Sign up today and start your free trial.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row justify-center">
                        <Button
                            onClick={() => navigate("/registration")}
                            className="gap-2 bg-primary hover:bg-primary/90"
                            size="lg">
                            Create Account
                            <ArrowRight size={18} />
                        </Button>
                        <Button
                            onClick={() => navigate("/about")}
                            variant="outline"
                            size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
