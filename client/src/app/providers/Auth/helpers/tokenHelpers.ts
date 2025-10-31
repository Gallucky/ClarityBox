import { jwtDecode } from "jwt-decode";

import type { Token } from "@/types/Token";
import type { TokenValidity } from "@/types/TokenValidity";

/**
 * This method will decode a token safely,
 * if there is an error it will return null.
 * @param token The token to decode as a string.
 * @returns The decoded token as a {@link Token | `Token`} object or null otherwise.
 */
export const decodeToken = (token: string | null): Token | null => {
    if (!token) return null;

    try {
        return jwtDecode<Token>(token);
    } catch (error) {
        return null;
    }
};

/**
 * This method checks a token's validity.
 * The `!!` converts the token.exp value to a boolean,
 * thus checking if the property exp exists.
 * @param token The token object to check if it is expired
 * @returns True if the token expired, false otherwise
 */
export const isTokenExpired = (token: Token): boolean =>
    !!token.exp && Date.now() > token.exp * 1000;

/**
 * This method checks if a token is valid.
 * @param token The {@link token | `token`} to check.
 * @returns True if the token is a valid token - otherwise false.
 */
export const isTokenValid = (token: Token | null): TokenValidity => {
    if (!token) return { result: false, status: "missing" };
    if (!token._id || !token.iat || !token.exp) return { result: false, status: "invalid" };
    if (isTokenExpired(token)) return { result: false, status: "expired" };
    return { result: true };
};
