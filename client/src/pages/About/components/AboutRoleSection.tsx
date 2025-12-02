import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import type { User } from "@/types/models/User";

interface AboutRoleSectionProps {
    user: User | null;
}

const AboutRoleSection = ({ user }: AboutRoleSectionProps) => {
    const navigate = useNavigate();
    const isAdmin = user?.isAdmin ?? false;

    if (!user) return null;

    return (
        <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        {isAdmin ? "Admin Dashboard Access" : "Your ClarityBox Experience"}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                        {isAdmin
                            ? "As an administrator, you have access to powerful tools for managing users, projects, and system settings. Use the CRM dashboard to oversee all platform activities."
                            : "You're all set to use ClarityBox! Start by creating your first project or exploring your dashboard to see all available features."}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            onClick={() => navigate(isAdmin ? "/crm" : "/dashboard")}
                            className="gap-2 bg-primary hover:bg-primary/90"
                            size="lg">
                            {isAdmin ? "Open CRM" : "Go to Dashboard"}
                            <ArrowRight size={18} />
                        </Button>
                        <Button
                            onClick={() => navigate("/")}
                            variant="outline"
                            size="lg">
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutRoleSection;
