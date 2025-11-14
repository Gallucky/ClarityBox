import type { Color } from "@/types/colors";

type SpinnerProps = {
    text?: string;
    direction?: "vertical" | "horizontal";
    color?: Color;
    className?: string;
    elementClassName?: string;
    textClassName?: string;
};

const Spinner = (props: SpinnerProps) => {
    const {
        text,
        direction = "horizontal",
        color = "accent",
        className,
        elementClassName,
        textClassName,
    } = props;

    return (
        <>
            <div
                className={`flex w-fit items-center justify-center gap-2 overflow-clip ${direction === "horizontal" ? "flex-row" : "flex-col"} ${className}`}
            >
                <div
                    className={`size-4 animate-spin rounded-full border-2 border-r-${color} ${elementClassName}`}
                />
                <span className={`font-inter text-fluid! ${textClassName}`}>
                    {text}
                </span>
            </div>
        </>
    );
};

export default Spinner;
