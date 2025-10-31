import { useContext } from "react";
import ProviderError from "@/errors/providerError";
import ThemeContext from "./ThemeContext";

/**
 * Custom hook that exposes the theme context.
 *
 * @throws {ProviderError} If used outside of a {@link ThemeProvider}.
 *
 * @returns {ThemeContextType} The current theme value and setter.
 *
 * @example
 * ```tsx
 * const { themeValue, setThemeValue } = useTheme();
 * setThemeValue(prev => (prev === "light" ? "dark" : "light"));
 * ```
 */
export const useTheme = () => {
    // Getting the object data from the context.
    const context = useContext(ThemeContext);

    // If the context is undefined, throw an error.
    if (context === undefined) {
        throw new ProviderError("ThemeProvider", "useTheme must be used within a ThemeProvider");
    }

    // Return the object data.
    return context;
};
