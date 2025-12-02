import { useNavigate } from "react-router-dom";
import { Shield, Zap, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import type { User } from "@/types/models/User";

interface HomeUserFeaturesProps {
    user: User | null;
}

const HomeUserFeatures = ({ user }: HomeUserFeaturesProps) => {
    const navigate = useNavigate();
    const isAdmin = user?.isAdmin ?? false;

    if (!user) return null;

    const adminFeatures = [
        {
            icon: Shield,
            title: "CRM Dashboard",
            description: "Manage users and system settings",
            action: () => navigate("/crm"),
            buttonText: "Access CRM",
            colorClass: "text-accent border-accent/30 hover:border-accent/60",
        },
        {
            icon: Zap,
            title: "Dashboard",
            description: "View all your activity and stats",
            action: () => navigate("/dashboard"),
            buttonText: "Go to Dashboard",
            colorClass: "text-primary border-primary/30 hover:border-primary/60",
        },
    ];

    const userFeatures = [
        {
            icon: Zap,
            title: "Dashboard",
            description: "Overview of your projects and tasks",
            action: () => navigate("/dashboard"),
            buttonText: "Open Dashboard",
            colorClass: "text-primary border-primary/30 hover:border-primary/60",
        },
        {
            icon: Users,
            title: "Projects",
            description: "Manage and track your projects",
            action: () => navigate("/projects"),
            buttonText: "View Projects",
            colorClass: "text-secondary border-secondary/30 hover:border-secondary/60",
        },
        {
            icon: CheckCircle2,
            title: "Gratitude Boxes",
            description: "Track your gratitude and reflections",
            action: () => navigate("/gratitude-boxes"),
            buttonText: "Open Boxes",
            colorClass: "text-primary border-primary/30 hover:border-primary/60",
        },
    ];

    const features = isAdmin ? adminFeatures : userFeatures;

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Your Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {isAdmin
                            ? "Access all admin tools and user management features"
                            : "Manage your projects, tasks, and gratitude boxes"}
                    </p>
                </div>

                <div className={`grid gap-8 ${isAdmin ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 ${feature.colorClass}`}>
                            <feature.icon className="h-10 w-10 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground mb-4">{feature.description}</p>
                            <Button
                                onClick={feature.action}
                                size="sm"
                                className="w-full">
                                {feature.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeUserFeatures;
