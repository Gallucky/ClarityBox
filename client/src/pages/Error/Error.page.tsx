import { BsFillHexagonFill } from "react-icons/bs";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import GlassCard from "@/components/form/GlassCard";
import BlurText from "@/components/text/BlurText";
import { Button } from "@/components/ui/shadcn/button";

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
            <GlassCard centered className="error-page">
                <div className="content">
                    <h2 className="title">404 Not Found</h2>
                    <div className="error-404-icon-logo">
                        <TbError404 size={"80%"} className="absolute-center" color="black" />
                        <BsFillHexagonFill size={"100%"} className="size-full" color="red" />
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
                    className="size-fit p-2! text-fluid font-inter max-sm:mt-5!">
                    Return to home page
                </Button>
            </GlassCard>
        </>
    );
};

export default Error;
