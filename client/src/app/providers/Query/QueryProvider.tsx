import { useMemo, type ReactNode } from "react";
import { addHeader, removeHeader } from "./helpers/api";
import { get, post, put, patch, delete_ } from "./helpers/request";
import QueryContext from "./QueryContext";

type QueryProviderProps = {
    children: ReactNode;
};

// Creating the provider.
export const QueryProvider = (props: QueryProviderProps) => {
    const { children } = props;

    // The context value and it is needed to be memorized
    // to avoid infinite loops of re-renders.
    const contextValue = useMemo(
        () => ({
            get,
            post,
            put,
            patch,
            delete: delete_,
            addHeader,
            removeHeader,
        }),
        [],
    );

    return (
        <QueryContext.Provider value={contextValue}>
            {children}
        </QueryContext.Provider>
    );
};
