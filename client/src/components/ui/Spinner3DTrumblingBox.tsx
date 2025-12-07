import TextAnimator from "@components/text/TextAnimator/TextAnimator";

type SpinnerBox3DTumbleProps = {
    text?: string;
    direction?: "vertical" | "horizontal";
    size?: "sm" | "md" | "lg" | "xl";
    textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
    elementClassName?: string;
    textClassName?: string;
    textAnimation?: "letters-bounce" | "dots-wave";
};

const SpinnerBox3DTumble = (props: SpinnerBox3DTumbleProps) => {
    const {
        text,
        direction = "horizontal",
        size = "md",
        textSize = "md",
        className = "",
        elementClassName = "",
        textClassName = "",
        textAnimation = undefined,
    } = props;

    const sizes = { xs: 16, sm: 32, md: 64, lg: 96, xl: 128, "2xl": 256 };
    const svgSize = sizes[size];

    // Size mappings for text
    const textSizeClasses = {
        xs: "text-fluid-0.75",
        sm: "text-fluid-0.9",
        md: "text-fluid",
        lg: "text-fluid-1.25",
        xl: "text-fluid-1.5",
        "2xl": "text-fluid-1.75",
    };

    const spinnerTextSize = textSizeClasses[textSize];

    return (
        <div
            className={`bg- flex size-fit items-center justify-center overflow-clip ${
                direction === "horizontal" ? "flex-row" : "flex-col"
            } ${className}`}
            role="status"
            aria-live="polite"
            aria-label={text || "Loading"}
        >
            <svg width={svgSize} height={svgSize} viewBox="0 0 128 128">
                <defs>
                    <linearGradient id="bt1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#47E0F3" />
                        <stop offset="100%" stopColor="#3B5BFF" />
                    </linearGradient>
                    <linearGradient id="bt2" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3ECBF0" />
                        <stop offset="100%" stopColor="#3A37F5" />
                    </linearGradient>
                    <linearGradient id="bt3" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#42D7F2" />
                        <stop offset="100%" stopColor="#4B46FF" />
                    </linearGradient>
                </defs>
                <g transform="translate(64, 64)">
                    <g>
                        <polygon
                            points="0,-18 20,-8 0,2 -20,-8"
                            fill="url(#bt3)"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 0 0; 90 0 0; 180 0 0; 270 0 0; 360 0 0"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </polygon>
                        <polygon
                            points="-20,-8 0,2 0,22 -20,12"
                            fill="url(#bt1)"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 0 0; 90 0 0; 180 0 0; 270 0 0; 360 0 0"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </polygon>
                        <polygon points="0,2 20,-8 20,12 0,22" fill="url(#bt2)">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 0 0; 90 0 0; 180 0 0; 270 0 0; 360 0 0"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </polygon>
                        <polygon
                            points="0,-18 20,-8 20,12 0,22 -20,12 -20,-8"
                            fill="none"
                            stroke="#79F2FF"
                            strokeWidth="1.5"
                            opacity="0.6"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 0 0; 90 0 0; 180 0 0; 270 0 0; 360 0 0"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </polygon>
                    </g>
                </g>
            </svg>
            {text && (
                <span
                    className={`${spinnerTextSize + "!"} -ms-5! ${textClassName}`}
                >
                    {!textAnimation && text}
                    {textAnimation && (
                        <TextAnimator
                            text={text}
                            textAnimation={textAnimation}
                            spinnerTextSize={spinnerTextSize}
                            textClassName={textClassName}
                        />
                    )}
                </span>
            )}
        </div>
    );
};

export default SpinnerBox3DTumble;
