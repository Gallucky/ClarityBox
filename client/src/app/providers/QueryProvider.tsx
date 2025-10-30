import ProviderError from "@/Errors/providerErrors";
import axios from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";

// 1. Creating the type of the context //

/**
 * The data shape the consumer components will get.
 */
type QueryContextType = {
    get: (url: string) => Promise<any>;
    post: (url: string, data: any) => Promise<any>;
    put: (url: string, data: any) => Promise<any>;
    patch: (url: string, data: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
    addHeader: (key: string, value: string) => void;
    removeHeader: (key: string) => void;
};

// 2. Creating the context.
const QueryContext = createContext<QueryContextType | undefined>(undefined);

type QueryProviderProps = {
    children: ReactNode;
};

type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// 3. Creating the provider.
export const QueryProvider = (props: QueryProviderProps) => {
    const { children } = props;

    // 4. Creating the method calls wrapper methods.

    const request = async <T = any,>(method: HTTPMethod, url: string, data?: any): Promise<T> => {
        const methodMap = {
            get: api.get,
            post: api.post,
            put: api.put,
            patch: api.patch,
            delete: api.delete,
        };

        try {
            const response =
                method === "get" || method === "delete"
                    ? await methodMap[method](url)
                    : await methodMap[method](url, data);
            return response.data as T;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message =
                    error.response?.data?.message ||
                    error.message ||
                    "An unknown Axios error occurred";

                return Promise.reject({
                    type: "AxiosError",
                    status,
                    message,
                    data: error.response?.data,
                });
            }

            // Non-Axios or unexpected errors
            return Promise.reject({
                type: "GenericError",
                message: (error as Error).message || "An unknown error occurred",
            });
        }
    };

    const get = (url: string) => request("get", url);

    const post = (url: string, data?: any) => request("post", url, data);

    const put = (url: string, data?: any) => request("put", url, data);

    const patch = (url: string, data?: any) => request("patch", url, data);

    const delete_ = (url: string) => request("delete", url);

    const addHeader = (key: string, value: string) => {
        api.defaults.headers.common[key] = value;
    };

    const removeHeader = (key: string) => {
        delete api.defaults.headers.common[key];
    };

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

// 5. Creating the custom hook.
export const useQuery = () => {
    const context = useContext(QueryContext);

    if (context === undefined) {
        throw new ProviderError("QueryProvider", "useQuery must be used within a QueryProvider");
    }

    return context;
};
