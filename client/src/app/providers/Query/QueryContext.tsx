import { createContext } from "react";

/**
 * The data shape the consumer components will get.
 */
type QueryContextType = {
    get: (url: string) => Promise<any>;
    post: (url: string, data?: any) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    patch: (url: string, data?: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
    addHeader: (key: string, value: string) => void;
    removeHeader: (key: string) => void;
};

// Creating the context.
/** @internal Do not import directly. Use `useQuery()` instead. */
const QueryContext = createContext<QueryContextType | undefined>(undefined);

export default QueryContext;
