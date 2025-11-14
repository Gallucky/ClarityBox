// components/AnimatedPage.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedPageProps = {
    children: ReactNode;
    variant?: "fade" | "slide" | "slideUp" | "scale";
};

const variants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    slide: {
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 },
    },
    slideUp: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    },
    scale: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.05, opacity: 0 },
    },
};

const AnimatedPage = ({ children, variant = "fade" }: AnimatedPageProps) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants[variant]}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
