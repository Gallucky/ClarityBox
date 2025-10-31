import { useState, type ReactNode } from "react";
import type { ThemeValues } from "@/types/ThemeValues";
import ThemeContext from "./ThemeContext";

/**
 * Props accepted by {@link ThemeProvider}.
 */
type ThemeProviderProps = {
    /**
     * @field Nested React elements that will have access to the theme context.
     */
    children: ReactNode;

    /**
     * @field Optional initial theme value. Defaults to `"light"`.
     */
    initial?: ThemeValues;
};

// Creating the provider //
/**
 * Provides global theme state ("light" or "dark") to all child components.
 *
 * @param {ThemeProviderProps} props - Component props.
 * @returns {JSX.Element} The provider component.
 *
 * @example
 * ```tsx
 * <ThemeProvider initial="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initial = "light" } = props;
    const [themeValue, setThemeValue] = useState<ThemeValues>(initial);
    return (
        <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
            {children}
        </ThemeContext.Provider>
    );
};
