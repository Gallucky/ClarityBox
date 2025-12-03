import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/models/User";
import { Button } from "@components/ui/shadcn/button";

interface HomeHeroSectionProps {
    user: User | null;
}

const HomeHeroSection = ({ user }: HomeHeroSectionProps) => {
    const navigate = useNavigate();
    const isAdmin = user?.isAdmin ?? false;

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                                <Sparkles size={16} />
                                <span>Welcome to ClarityBox</span>
                            </div>

                            {!user ? (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Organize Your{" "}
                                        <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                                            Thoughts & Projects
                                        </span>
                                    </h1>
                                    <p className="text-muted-foreground text-lg sm:text-xl">
                                        ClarityBox helps you manage projects,
                                        tasks, and gratitude in one beautiful
                                        platform.
                                    </p>
                                </>
                            ) : isAdmin ? (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Welcome back,{" "}
                                        <span className="from-primary to-accent bg-linear-to-rg-clip-text text-transparent">
                                            Admin
                                        </span>
                                    </h1>
                                    <p className="text-muted-foreground text-lg sm:text-xl">
                                        Access all admin features including the
                                        CRM dashboard.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Welcome back,{" "}
                                        <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                                            {user?.name?.first}
                                        </span>
                                    </h1>
                                    <p className="text-muted-foreground text-lg sm:text-xl">
                                        Continue managing your projects and
                                        tasks.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {!user ? (
                                <>
                                    <Button
                                        onClick={() =>
                                            navigate("/registration")
                                        }
                                        className="bg-primary hover:bg-primary/90 gap-2"
                                        size="lg"
                                    >
                                        Get Started
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/login")}
                                        variant="outline"
                                        size="lg"
                                    >
                                        Sign In
                                    </Button>
                                </>
                            ) : isAdmin ? (
                                <>
                                    <Button
                                        onClick={() => navigate("/crm")}
                                        className="bg-accent hover:bg-accent/90 gap-2"
                                        size="lg"
                                    >
                                        Go to CRM
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/dashboard")}
                                        variant="outline"
                                        size="lg"
                                    >
                                        Dashboard
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => navigate("/dashboard")}
                                        className="bg-primary hover:bg-primary/90 gap-2"
                                        size="lg"
                                    >
                                        Go to Dashboard
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/projects")}
                                        variant="outline"
                                        size="lg"
                                    >
                                        View Projects
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="home-hero-visual relative h-96 w-full">
                            <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-2xl bg-linear-to-br blur-3xl"></div>
                            <div className="border-primary/20 bg-card/50 relative flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl border p-8 backdrop-blur-sm">
                                <div className="w-full space-y-4">
                                    <div className="bg-primary/30 h-3 w-3/4 rounded-full"></div>
                                    <div className="bg-secondary/30 h-3 w-full rounded-full"></div>
                                    <div className="bg-primary/20 h-3 w-2/3 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroSection;
