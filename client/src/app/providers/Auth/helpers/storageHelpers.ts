import type { Token } from "@/types/Token";

import { decodeToken, isTokenValid } from "./tokenHelpers";

export const persistToken = (token: string | null) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
};

export const clearToken = () => localStorage.removeItem("token");

export const getStoredToken = (): {
    token: string | null;
    decodedToken: Token | null;
    status?: "expired" | "invalid" | "missing";
} => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const tokenValidity = isTokenValid(decodedToken);

    // If there is an error then the token is cleared.
    if (tokenValidity.status) clearToken();

    return { token, decodedToken, status: tokenValidity.status };
};
