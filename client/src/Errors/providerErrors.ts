/**
 * Custom error type for context provider misuse.
 *
 * Thrown when a custom React hook that relies on a context
 * (for example, `useTheme`) is called outside of its corresponding provider.
 *
 * @example
 * ```tsx
 * // Inside a hook file
 * if (!context) {
 *   throw new ProviderError("ThemeProvider", "useTheme must be used within a ThemeProvider");
 * }
 * ```
 *
 * @extends Error
 */
class ProviderError extends Error {
    /**
     * @field The name of the provider that caused the error.
     */
    provider: string;

    /**
     * Creates a new ProviderError instance.
     *
     * @param {string} providerName - The name of the provider (e.g., "ThemeProvider").
     * @param {string} message - The specific error message.
     */
    constructor(providerName: string, message: string) {
        super(message);
        this.name = "ProviderError";
        this.provider = providerName;
        this.message = `[Provider Error - ${providerName}]: ${message}`;
    }
}

export default ProviderError;
