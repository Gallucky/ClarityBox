import GlassCard from "@/components/form/GlassCard";
import { TbError404 } from "react-icons/tb";
import { BsFillHexagonFill } from "react-icons/bs";
import BlurText from "@/components/text/BlurText";
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
            <GlassCard
                centered
                className="md:grid! md:grid-cols-2 md:grid-rows-2 h-7/12! w-[90%]! place-items-center justify-center! gap-10">
                <h2 className="text-3xl font-inter font-bold overflow-hidden row-start-1 row-end-1 col-start-2 col-end-2 text-outline text-destructive">
                    404 Not Found
                </h2>
                <div className="relative size-[25dvh] md:row-span-2 md:col-start-1 md:col-end-1">
                    <TbError404
                        size={"80%"}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        color="black"
                    />
                    <BsFillHexagonFill size={"100%"} className="size-full" color="red" />
                </div>
                <BlurText
                    text="The page you are looking for does not exist."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="overflow-hidden"
                    textClassName="text-[3.8dvw]! font-rubik! font-bold overflow-hidden"
                />
                <Button
                    onClick={() => navigate("/")}
                    variant={"outline"}
                    className="size-fit p-2! text-fluid font-inter">
                    Return to home page
                </Button>
            </GlassCard>
        </>
    );
};

export default Error;
