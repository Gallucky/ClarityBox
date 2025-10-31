import axios from "axios";
import ConfigurationError from "@/errors/ConfigurationError";

const createAxiosInstance = () => {
    const baseURL = import.meta.env.VITE_API_URL;

    if (!baseURL) {
        const message =
            "VITE_API_URL is missing in the environment in at least one of the .env files.";
        // Throw a clean error in production and development to make debugging easier.
        throw new ConfigurationError(message);
    }

    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const api = createAxiosInstance();

export const addHeader = (key: string, value: string) => {
    api.defaults.headers.common[key] = value;
};

export const removeHeader = (key: string) => {
    delete api.defaults.headers.common[key];
};
