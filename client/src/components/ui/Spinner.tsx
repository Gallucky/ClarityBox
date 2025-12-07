import type { Color } from "@/types/colors";

type SpinnerProps = {
    text?: string;
    direction?: "vertical" | "horizontal";
    color?: Color;
    size?: "sm" | "md" | "lg" | "xl";
    textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
    elementClassName?: string;
    textClassName?: string;
};

const Spinner = (props: SpinnerProps) => {
    const {
        text,
        direction = "horizontal",
        color = "accent",
        size = "md",
        textSize = "md",
        className = "",
        elementClassName = "",
        textClassName = "",
    } = props;

    // Size mappings for spinner
    const sizeClasses = {
        sm: "size-4 border-2",
        md: "size-8 border-2",
        lg: "size-12 border-3",
        xl: "size-16 border-4",
    };

    // Size mappings for text
    const textSizeClasses = {
        xs: "text-fluid-0.75",
        sm: "text-fluid-0.9",
        md: "text-fluid",
        lg: "text-fluid-1.25",
        xl: "text-fluid-1.5",
        "2xl": "text-fluid-1.75",
    };

    // Color mapping for border
    const colorClasses: Record<string, string> = {
        accent: "border-accent",
        primary: "border-primary",
        secondary: "border-second",
        success: "border-success",
        warning: "border-warning",
        error: "border-destructive",
        info: "border-cyan-600",
    };

    const borderColor = colorClasses[color] || `border-${color}`;
    const spinnerSize = sizeClasses[size];
    const spinnerTextSize = textSizeClasses[textSize];

    return (
        <div
            className={`flex size-fit items-center justify-center gap-2 overflow-clip ${
                direction === "horizontal" ? "flex-row" : "flex-col"
            } ${className}`}
            role="status"
            aria-live="polite"
            aria-label={text || "Loading"}
        >
            <div
                className={`${spinnerSize} animate-spin rounded-full border-gray-200 ${borderColor} border-r-transparent ${elementClassName}`}
                aria-hidden="true"
            />
            {text && (
                <span className={`${spinnerTextSize} ${textClassName}`}>
                    {text}
                </span>
            )}
        </div>
    );
};

export default Spinner;
