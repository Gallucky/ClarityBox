import { Shield, Zap, Users, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/models/User";
import { Button } from "@components/ui/shadcn/button";

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
            colorClass:
                "text-accent group-hover:fill-accent border-accent/30 hover:border-accent/60",
            buttonClass: "bg-accent hover:bg-accent/80",
        },
        {
            icon: Zap,
            title: "Dashboard",
            description: "View all your activity and stats",
            action: () => navigate("/dashboard"),
            buttonText: "Go to Dashboard",
            colorClass:
                "text-primary group-hover:fill-primary border-primary/30 hover:border-primary/60",
            buttonClass: "bg-primary hover:bg-primary/90",
        },
    ];

    const userFeatures = [
        {
            icon: Zap,
            title: "Dashboard",
            description: "Overview of your projects and tasks",
            action: () => navigate("/dashboard"),
            buttonText: "Open Dashboard",
            colorClass:
                "text-primary group-hover:fill-primary border-primary/30 hover:border-primary/60",
            buttonClass: "bg-primary hover:bg-primary/90",
        },
        {
            icon: Users,
            title: "Projects",
            description: "Manage and track your projects",
            action: () => navigate("/projects"),
            buttonText: "View Projects",
            colorClass:
                "text-secondary group-hover:fill-secondary border-secondary/30 hover:border-secondary/60",
            buttonClass: "bg-secondary hover:bg-secondary/90",
        },
        {
            icon: CheckCircle2,
            title: "Gratitude Boxes",
            description: "Track your gratitude and reflections",
            action: () => navigate("/gratitude-boxes"),
            buttonText: "Open Boxes",
            colorClass:
                "text-primary group-hover:fill-primary border-primary/30 hover:border-primary/60",
            buttonClass: "bg-primary hover:bg-primary/90",
        },
    ];

    const features = isAdmin ? adminFeatures : userFeatures;

    return (
        <section className="font-montserrat relative w-[90dvw]">
            <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-fluid-2! font-bold">Your Features</h2>
                <p className="text-muted-foreground text-fluid! mx-auto max-w-2xl">
                    {isAdmin
                        ? "Access all admin tools and user management features"
                        : "Manage your projects, tasks, and gratitude boxes"}
                </p>
            </div>

            <div
                className={`grid gap-8 p-6! select-none ${isAdmin ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
            >
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className={`bg-card group flex flex-col items-center justify-center rounded-2xl border p-6! transition-all duration-300 hover:shadow-lg ${feature.colorClass}`}
                    >
                        <feature.icon
                            className={`${feature.colorClass} mb-4 size-10 transition-transform group-hover:scale-110`}
                        />
                        <h3 className="mb-2 text-lg font-semibold">
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {feature.description}
                        </p>
                        <Button
                            onClick={feature.action}
                            size="sm"
                            className={`mt-6! ${feature.buttonClass} w-1/2 rounded-2xl`}
                        >
                            {feature.buttonText}
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeUserFeatures;
