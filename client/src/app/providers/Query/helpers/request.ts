import axios from "axios";
import type { HTTPMethod } from "@/types/HTTPMethod";
import { api } from "./api";

const request = async <T = any>(method: HTTPMethod, url: string, data?: any): Promise<T> => {
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
                error.response?.data?.message || error.message || "An unknown Axios error occurred";

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

export { get, post, put, patch, delete_ };
