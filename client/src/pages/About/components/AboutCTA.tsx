import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/shadcn/button";

const AboutCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-[90dvw] lg:w-2/3">
            <div className="border-primary/20 from-primary/10 to-secondary/10 rounded-2xl border bg-linear-to-r text-center">
                <div className="justify-content mb-4! flex flex-col items-center">
                    <h2 className="text-fluid-2! mb-4 font-bold">
                        Ready to Experience Clarity?
                    </h2>
                    <p className="text-muted-foreground text-fluid-1.25! mx-auto! mb-8 w-[90%]">
                        Join our community of users who have transformed the way
                        they work. Start your free trial today with no credit
                        card required.
                    </p>
                </div>
                <div className="my-6! flex h-96 max-h-[50px] items-center justify-center gap-3">
                    <Button
                        onClick={() => navigate("/registration")}
                        className="bg-primary hover:bg-primary/90 hover:text-secondary! text-outline hover:text-outline-background gap-2 rounded-full px-2!"
                        size="lg"
                    >
                        Get Started Free
                        <ArrowRight size={18} />
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        size="lg"
                        className="rounded-full px-2!"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
