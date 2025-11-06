// MotionSwitch.tsx
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSwitchProps = {
    value: string | number | boolean;
    children: (value: string | number | boolean) => ReactNode;
    config?: {
        initial?: Record<string, any>;
        animate?: Record<string, any>;
        exit?: Record<string, any>;
        transition?: Record<string, any>;
        wait?: boolean;
        initialAnimations?: boolean;
    };
};

const MotionSwitch = ({ value, children, config = {} }: MotionSwitchProps) => {
    const {
        initial = { opacity: 0, scale: 0 },
        animate = { opacity: 1, scale: 1 },
        exit = { opacity: 0, scale: 0 },
        transition = { duration: 0.4 },
        wait = true,
        initialAnimations = false,
    } = config;

    return (
        <AnimatePresence mode={wait ? "wait" : "sync"} initial={initialAnimations}>
            <motion.div
                key={String(value)}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}>
                {children(value)}
            </motion.div>
        </AnimatePresence>
    );
};

export default MotionSwitch;
