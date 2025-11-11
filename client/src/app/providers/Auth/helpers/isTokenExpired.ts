import type { Token } from "@/types/Token";

/**
 * This method checks a token's validity.
 * The `!!` converts the token.exp value to a boolean,
 * thus checking if the property exp exists.
 * @param token The token object to check if it is expired
 * @returns True if the token expired, false otherwise
 */
export const isTokenExpired = (token: Token): boolean =>
    !!token.exp && Date.now() > token.exp * 1000;
