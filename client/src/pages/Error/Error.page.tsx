import { Hexagon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassCard from "@/components/form/GlassCard";
import BlurText from "@/components/text/BlurText";
import { Button } from "@/components/ui/shadcn/button";

import "./errorPageStyles.css";

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
            <GlassCard centered className="error-page">
                <div className="content">
                    <h2 className="title">404 Not Found</h2>
                    <div className="error-404-icon-logo">
                        <span className="absolute-center font-bold text-fluid-3! font-inter text-black text-outline text-outline-white select-none">
                            404
                        </span>
                        <Hexagon size={"100%"} className="size-full fill-[red]" color="red" />
                    </div>
                    <BlurText
                        text="The page you are looking for does not exist."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="overflow-hidden col-start-2 col-end-2 row-start-1 row-end-3 md:translate-y-8"
                        textClassName="font-rubik! font-bold overflow-hidden"
                    />
                </div>
                <Button
                    onClick={() => navigate("/")}
                    variant={"outline"}
                    className="size-fit p-2! text-fluid font-inter max-sm:mt-5! text-accent">
                    Return to home page
                </Button>
            </GlassCard>
        </>
    );
};

export default Error;
