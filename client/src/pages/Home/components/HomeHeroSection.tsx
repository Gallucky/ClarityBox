import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import type { User } from "@/types/models/User";

interface HomeHeroSectionProps {
    user: User | null;
}

const HomeHeroSection = ({ user }: HomeHeroSectionProps) => {
    const navigate = useNavigate();
    const isAdmin = user?.isAdmin ?? false;

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                <Sparkles size={16} />
                                <span>Welcome to ClarityBox</span>
                            </div>

                            {!user ? (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Organize Your{" "}
                                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            Thoughts & Projects
                                        </span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground sm:text-xl">
                                        ClarityBox helps you manage projects, tasks, and gratitude in one
                                        beautiful platform.
                                    </p>
                                </>
                            ) : isAdmin ? (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Welcome back,{" "}
                                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                            Admin
                                        </span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground sm:text-xl">
                                        Access all admin features including the CRM dashboard.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        Welcome back,{" "}
                                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            {user?.name?.first}
                                        </span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground sm:text-xl">
                                        Continue managing your projects and tasks.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {!user ? (
                                <>
                                    <Button
                                        onClick={() => navigate("/registration")}
                                        className="gap-2 bg-primary hover:bg-primary/90"
                                        size="lg">
                                        Get Started
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/login")}
                                        variant="outline"
                                        size="lg">
                                        Sign In
                                    </Button>
                                </>
                            ) : isAdmin ? (
                                <>
                                    <Button
                                        onClick={() => navigate("/crm")}
                                        className="gap-2 bg-accent hover:bg-accent/90"
                                        size="lg">
                                        Go to CRM
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/dashboard")}
                                        variant="outline"
                                        size="lg">
                                        Dashboard
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => navigate("/dashboard")}
                                        className="gap-2 bg-primary hover:bg-primary/90"
                                        size="lg">
                                        Go to Dashboard
                                        <ArrowRight size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/projects")}
                                        variant="outline"
                                        size="lg">
                                        View Projects
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="home-hero-visual relative h-96 w-full">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"></div>
                            <div className="relative h-full w-full rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-8 flex flex-col justify-center items-center gap-6">
                                <div className="space-y-4 w-full">
                                    <div className="h-3 w-3/4 rounded-full bg-primary/30"></div>
                                    <div className="h-3 w-full rounded-full bg-secondary/30"></div>
                                    <div className="h-3 w-2/3 rounded-full bg-primary/20"></div>
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
