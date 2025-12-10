import axios from "axios";
import { useEffect, type ReactNode } from "react";
import AuthProvider from "./Auth/AuthProvider";
import { QueryProvider } from "./Query/QueryProvider";
import { ThemeProvider } from "./Theme/ThemeProvider";

// Todo: Move this template for documentation and/or to the readme file.
// How to create a new provider?
// 1. Create a dedicated file for the provider (e.g., ThemeProvider.tsx)
// 2. Create a context type for defining the data's shape/structure.
// 3. Create the context.
// 4. Create a type for the context's provider's props.
// 5. Create the context provider
//    -> This makes it so there is control over what descendence components can subscribe to.
// 6. Create a custom hook for the context provider for easier use/access.
//    e.g: `useTheme`

type AppProvidersProps = {
    children?: ReactNode;
};

const AppProviders = (props: AppProvidersProps) => {
    // Checking the server's health.
    // If the server isn't up then it will wake it.

    useEffect(() => {
        const checkServerHealth = async () => {
            try {
                await axios.get("/health");
                console.info("trying to wake server up...");
            } catch (error) {
                // Server is waking up or unreachable,
                // ignore the error to not block the frontend workflow.
                console.warn(
                    "Server health check error has occurred but continuing.\nError:\n",
                    error,
                );
            }
        };

        // Initial ping to wake the server up if it is down.
        checkServerHealth();

        // Trying to keep the server up every 10 minutes.
        const interval = setInterval(checkServerHealth, 10 * 60 * 1000);

        // Cleaning up the interval on component unmount.
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <QueryProvider>
                <AuthProvider>
                    <ThemeProvider>{props.children}</ThemeProvider>
                </AuthProvider>
            </QueryProvider>
        </>
    );
};

export default AppProviders;
