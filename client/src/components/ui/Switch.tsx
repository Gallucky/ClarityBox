import { useState } from "react";

type TextFluidSize =
    | "0.25"
    | "0.5"
    | "0.625"
    | "0.75"
    | "1"
    | "1.25"
    | "1.5"
    | "1.75"
    | "2"
    | "2.25"
    | "2.5"
    | "2.75"
    | "3";

type SwitchProps = {
    textSize?: TextFluidSize;
    children?: string;
    className?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
};

const Switch = (props: SwitchProps) => {
    const { textSize = "1", children, className, checked, onChange } = props;

    const [internal, setInternal] = useState(false);
    const isToggled = checked ?? internal;

    const toggle = () => {
        const newValue = !isToggled;
        if (onChange) onChange(newValue);
        else setInternal(newValue);
    };

    return (
        <>
            <div
                role="switch"
                data-toggled={isToggled}
                className={`group ${className}`}
                onClick={toggle}
            >
                <div className={`track`}>
                    <div
                        className={`knob ${isToggled ? "translate-x-[calc(50px-1.75rem)]" : ""}`}
                    />
                </div>
                <span
                    className={`${textSize === "1" ? "text-fluid!" : `text-fluid-${textSize}!`}`}
                >
                    {children}
                </span>
            </div>
        </>
    );
};

export default Switch;
