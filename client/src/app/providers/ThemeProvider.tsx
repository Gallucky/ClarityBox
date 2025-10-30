import ProviderError from "@/Errors/providerErrors";
import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";

/**
 * Supported theme values.
 */
type ThemeValues = "light" | "dark";

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
export const useTheme = (): ThemeContextType => {
    // Getting the object data from the context.
    const context = useContext(ThemeContext);

    // If the context is undefined, throw an error.
    if (context === undefined) {
        throw new ProviderError("ThemeProvider", "useTheme must be used within a ThemeProvider");
    }

    // Return the object data.
    return context;
};
