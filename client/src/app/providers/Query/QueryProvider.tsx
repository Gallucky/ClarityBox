import { addHeader, removeHeader } from "./helpers/api";
import { get, post, put, patch, delete_ } from "./helpers/request";
import QueryContext from "./QueryContext";
import type { ReactNode } from "react";

type QueryProviderProps = {
    children: ReactNode;
};

// Creating the provider.
export const QueryProvider = (props: QueryProviderProps) => {
    const { children } = props;

    return (
        <QueryContext.Provider
            value={{
                get,
                post,
                put,
                patch,
                delete: delete_,
                addHeader,
                removeHeader,
            }}>
            {children}
        </QueryContext.Provider>
    );
};
