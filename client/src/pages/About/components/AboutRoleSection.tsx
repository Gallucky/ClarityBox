import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/models/User";
import { Button } from "@components/ui/shadcn/button";

interface AboutRoleSectionProps {
    user: User;
}

const AboutRoleSection = (props: AboutRoleSectionProps) => {
    const { user } = props;
    const navigate = useNavigate();
    const isAdmin = user.isAdmin;

    return (
        <section className="relative w-[90dvw] lg:w-2/3">
            <div className="border-primary/20 from-primary/10 to-secondary/10 rounded-2xl border bg-linear-to-r text-center">
                <h2 className="text-fluid-2! mb-4 font-bold">
                    {isAdmin
                        ? "Admin Dashboard Access"
                        : "Your ClarityBox Experience"}
                </h2>
                <p className="text-muted-foreground text-fluid-1.25! mx-auto! mb-8 w-[90%]">
                    {isAdmin
                        ? "As an administrator, you have access to powerful tools for managing users, projects, and system settings. Use the CRM dashboard to oversee all platform activities."
                        : "You're all set to use ClarityBox! Start by creating your first project or exploring your dashboard to see all available features."}
                </p>
                <div className="my-6! flex h-96 max-h-[50px] items-center justify-center gap-3">
                    <Button
                        onClick={() =>
                            navigate(isAdmin ? "/crm" : "/dashboard")
                        }
                        className="bg-primary hover:bg-primary/90 hover:text-secondary! text-outline hover:text-outline-background gap-2 rounded-full px-2!"
                        size="lg"
                    >
                        {isAdmin ? "Open CRM" : "Go to Dashboard"}
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

export default AboutRoleSection;
