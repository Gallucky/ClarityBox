import { jwtDecode } from "jwt-decode";
import { useEffect, useState, type ReactNode } from "react";

import useQuery from "@app/providers/Query/useQuery";

import InvalidCredentialsError from "@/errors/InvalidCredentialsError";
import type { Auth, AuthPromise } from "@/types/AuthPromise";
import type { RegisterFormData } from "@/types/forms/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { Token } from "@/types/Token";
import type { User } from "@/types/User";

import { parseError } from "@/utils/parseError";
import AuthContext from "./AuthContext";
import { getStoredToken } from "./helpers/storageHelpers";

// Defining the context's provider's props.
type AuthProviderProps = {
    children: ReactNode;
};

/**
 * Manages authentication state (token + user) in the AuthContext.
 *
 * @description
 * This context caches authentication data for quick access across the app,
 * avoiding redundant `/users/me` fetches while providing user identity,
 * permissions, and display info to UI components.
 *
 * @property {string | null} token - JWT or session token for authenticated API requests.
 * @property {User | null} user - Cached user data (non-sensitive fields only).
 * @property {boolean} isAuthenticated - Derived value; true if a token exists.
 *
 * @lifecycle
 * - **On login**
 *   - Receive `{ token, user }` from server.
 *   - Call `setToken(token)` and `setUser(user)`.
 *   - Optionally persist token in `localStorage`.
 *
 * - **On logout**
 *   - Clear token and user state.
 *   - Remove persisted token from storage.
 *
 * - **On user update (e.g., profile edit)**
 *   - Receive updated user object from server.
 *   - Call `setUser(updatedUser)` to sync context.
 *
 * - **On token refresh**
 *   - Update token.
 *   - Optionally re-fetch `/users/me` to ensure user state consistency.
 *
 * - **On app initialization**
 *   - Restore token from storage if present.
 *   - Validate or refresh user data if needed.
 *
 * @notes
 * - Treat `user` as cached state; backend remains the source of truth.
 * - Never store sensitive fields (e.g., passwords, raw JWT payloads).
 * - Compute `isAuthenticated` dynamically (`!!token`) instead of persisting it.
 */
const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const api = useQuery();

    // The states manged by the provider.
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const restoreSession = async () => {
            const { token: storedToken, decodedToken, status } = getStoredToken();

            // If there is an error skipping because that means the token is expired/invalid/missing.
            if (status || !storedToken || !decodedToken) return;

            try {
                // Loading the token.
                setLoading(true);
                setToken(storedToken);

                // Fetching the user data.
                const userId = decodedToken._id;
                // Getting the data from the API.
                // It is called user the same as the user
                // state value so the returned data is renamed to userData.
                api.addHeader("x-auth-token", storedToken);
                const { user: userData } = await api.get(`/users/${userId}`);
                setUser(userData ?? null);

                return { ok: true };
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                api.removeHeader("x-auth-token");
            } finally {
                setLoading(false);
            }
        };
        void restoreSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * `isAuthenticated` is a derived constant based on the {@link token | token} state.
     *
     * React re-renders whenever `token` changes, so this value updates automatically.
     * It should not be set manually within `login` or `logout`.
     *
     * The `!!token` expression ensures the result is always a boolean:
     * - The first `!` converts any value to its boolean opposite.
     * - The second `!` flips it back, preserving the truthiness but as a strict boolean.
     *
     * @example
     * token = null         → !!token → false
     * token = "some-token" → !!token → true
     */
    const isAuthenticated = !!token;

    const onError = (error: any): Auth => {
        const status = error.response?.status ?? error.status ?? 500;
        const data = error.response?.data ?? error.data ?? error.message;

        const parsedError = parseError(status, String(data));
        console.error(parsedError);
        return { ok: false, error: parsedError };
    };

    // The auth methods.
    const login = async (credentials: LoginPayload): AuthPromise => {
        try {
            setLoading(true);
            const userToken = await api.post("/users/login", credentials);

            if (!userToken) {
                return {
                    ok: false,
                    error: new InvalidCredentialsError(
                        "The email or password were incorrect at this login attempt."
                    ),
                };
            }

            // Saving the token in the context.
            setToken(userToken);
            // Saving the token in the local storage.
            localStorage.setItem("token", userToken);

            // Decoding the token.
            const decodedToken = jwtDecode<Token>(userToken);
            // Getting the user id from the decoded token.
            const userId = decodedToken._id;

            // Fetching the user data.
            api.addHeader("x-auth-token", userToken);
            const { user } = await api.get(`/users/${userId}`);
            setUser(user ?? null);

            return { ok: true };
        } catch (error: any) {
            return onError(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        api.removeHeader("x-auth-token");
    };

    const registerUser = async (data: RegisterFormData): AuthPromise => {
        try {
            setLoading(true);
            // Sending the user registration request.
            await api.post("/users/", data);

            // Auto login feature.
            await login({ email: data.email, password: data.password });

            return { ok: true };
        } catch (error) {
            return onError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout, registerUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
