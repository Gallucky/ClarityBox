import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";

type AppProvidersProps = {
    children?: ReactNode;
};

const AppProviders = (props: AppProvidersProps) => {
    return (
        <>
            <QueryProvider>
                <ThemeProvider>{props.children}</ThemeProvider>
            </QueryProvider>
        </>
    );
};

export default AppProviders;
