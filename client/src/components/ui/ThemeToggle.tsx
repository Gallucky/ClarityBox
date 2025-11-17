import { Moon, Sun } from "lucide-react";
import MotionSwitch from "@components/utils/MotionSwitch";
import { useTheme } from "@/app/providers/Theme/useTheme";

type ThemeToggleProps = {
    className?: string;
};

const ThemeToggle = (props: ThemeToggleProps) => {
    const { themeValue, setThemeValue } = useTheme();
    const { className } = props;

    return (
        <button
            type="button"
            onClick={() =>
                setThemeValue((prev) => (prev === "light" ? "dark" : "light"))
            }
            className={`ease text-xl transition-all! duration-1000 ${className}`}
        >
            <MotionSwitch
                value={themeValue}
                config={{
                    initial: { opacity: 0, rotateY: 0 },
                    animate: { opacity: 1, rotateY: 360 },
                    exit: { opacity: 0, rotateY: 0 },
                    transition: { duration: 0.3 },
                }}
            >
                {(val) =>
                    val === "dark" ? (
                        <Sun color="yellow" />
                    ) : (
                        <Moon color="black" />
                    )
                }
            </MotionSwitch>
        </button>
    );
};

export default ThemeToggle;
