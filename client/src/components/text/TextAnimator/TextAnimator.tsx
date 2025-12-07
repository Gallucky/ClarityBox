import React from "react";
// Ensure your global CSS file (e.g., './global.css') is imported somewhere in your project

type TextAnimatorProps = {
    text: string;
    textAnimation: "letters-bounce" | "dots-wave";
    spinnerTextSize: string;
    textClassName: string;
};

const TextAnimator = (props: TextAnimatorProps) => {
    const { text, textAnimation, spinnerTextSize, textClassName } = props;

    // Define the delay step in milliseconds
    const DELAY_STEP_MS = textAnimation === "dots-wave" ? 150 : 50;

    if (!textAnimation || !text) {
        // Fallback for when the animation is not requested
        return <div className={textClassName}>{text}</div>;
    }

    let textWithoutDots = "";
    if (textAnimation === "dots-wave") {
        textWithoutDots = text
            .split("")
            .filter((char) => char !== ".")
            .join("");
        console.log(textWithoutDots);
    }

    return (
        <div className="flex justify-center">
            {" "}
            {/* Use flex to keep letters inline */}
            {textAnimation === "letters-bounce" &&
                text.split("").map((char, index) => {
                    // Calculate the delay in seconds, as required by the CSS animation-delay property
                    const delaySeconds = (index * DELAY_STEP_MS) / 1000;

                    return (
                        <span
                            key={index}
                            // Apply the pure CSS animation class
                            className={`animate-wave-bounce ${spinnerTextSize + "!"} ${textClassName} `}
                            // Apply the staggered delay using the inline style prop
                            style={{ animationDelay: `${delaySeconds}s` }}
                        >
                            {/* Preserve spaces by using a non-breaking space */}
                            {char === " " ? "\u00A0" : char}
                        </span>
                    );
                })}
            {textAnimation === "dots-wave" && textWithoutDots}
            {textAnimation === "dots-wave" &&
                text
                    .split("")
                    .filter((char) => char === ".")
                    .map((char, index) => {
                        // Calculate the delay in seconds, as required by the CSS animation-delay property
                        const delaySeconds = (index * DELAY_STEP_MS) / 1000;

                        return (
                            <span
                                key={index}
                                // Apply the pure CSS animation class
                                className={`animate-dots-wave-bounce ${spinnerTextSize + "!"} ${textClassName} `}
                                // Apply the staggered delay using the inline style prop
                                style={{ animationDelay: `${delaySeconds}s` }}
                            >
                                {char}
                            </span>
                        );
                    })}
        </div>
    );
};

export default TextAnimator;
