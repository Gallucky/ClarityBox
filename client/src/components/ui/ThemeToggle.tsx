import { FaSun, FaMoon } from "react-icons/fa";
import GlassCard from "@components/form/GlassCard";
import MotionSwitch from "@components/utils/MotionSwitch";
import { useTheme } from "@/app/providers/Theme/useTheme";

const ThemeToggle = () => {
    const { themeValue, setThemeValue } = useTheme();

    return (
        <button
            type="button"
            onClick={() => setThemeValue((prev) => (prev === "light" ? "dark" : "light"))}
            className="text-xl transition-all! duration-1000 ease">
            <GlassCard
                className={`size-10! p-0! rounded-xl! app-accent-bg border-2! app-border!`}
                lightSource={false}>
                <MotionSwitch
                    value={themeValue}
                    config={{
                        initial: { opacity: 0, rotateY: 0 },
                        animate: { opacity: 1, rotateY: 360 },
                        exit: { opacity: 0, rotateY: 0 },
                        transition: { duration: 0.3 },
                    }}>
                    {(val) =>
                        val === "dark" ? <FaSun color="yellow" /> : <FaMoon color="white" />
                    }
                </MotionSwitch>
            </GlassCard>
        </button>
    );
};

export default ThemeToggle;
