import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/shadcn/button";

const HomeCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="border-primary/20 from-primary/10 to-secondary/10 rounded-2xl border bg-linear-to-r p-8 text-center sm:p-12">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to Get Started?
                    </h2>
                    <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
                        Join thousands of users who are already organizing their
                        work with ClarityBox. Sign up today and start your free
                        trial.
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            onClick={() => navigate("/registration")}
                            className="bg-primary hover:bg-primary/90 gap-2"
                            size="lg"
                        >
                            Create Account
                            <ArrowRight size={18} />
                        </Button>
                        <Button
                            onClick={() => navigate("/about")}
                            variant="outline"
                            size="lg"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
