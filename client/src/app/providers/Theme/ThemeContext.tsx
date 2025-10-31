import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ThemeValues } from "@/types/ThemeValues";

/**
 * Theme context data shape.
 */
type ThemeContextType = {
    /**
     * @field The current theme value.
     */
    themeValue: ThemeValues;

    /**
     * Setter function for updating the theme.
     * Accepts either a new value ("light" | "dark")
     * or a function that derives the next value.
     */
    setThemeValue: Dispatch<SetStateAction<ThemeValues>>;
};

// Creating the context //
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
