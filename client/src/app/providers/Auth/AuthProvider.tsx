import { useState, type ReactNode } from "react";

import { toast } from "react-toastify";

import useUsers from "@/hooks/api/useUsers";
import type { Auth, AuthPromise } from "@/types/AuthPromise";
import type { RegisterFormData } from "@/types/forms/user/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { User } from "@/types/models/User";

import { parseError } from "@/utils/parseError";
import useQuery from "@app/providers/Query/useQuery";
import AuthContext from "./AuthContext";
import useRestoreSession from "./helpers/useRestoreSession";

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
    const [restoring, setRestoring] = useState(true);

    // Trying to re-log a user after a page refresh/close.
    useRestoreSession({ api, setUser, setToken, setLoading, setRestoring });

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

    const { loginUser, getUserByToken, registerUser, error } = useUsers();

    // The auth methods.
    const login = async (credentials: LoginPayload): AuthPromise => {
        try {
            setLoading(true);

            api.removeHeader("x-auth-token");

            const userToken: string = await loginUser(credentials);
            if (error) throw error;

            const user = await getUserByToken(userToken);
            if (error) throw error;

            // Saving the token in the context.
            setToken(userToken);
            // Saving the token in the local storage.
            localStorage.setItem("token", userToken);
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
        toast.success("Logged out successfully!");
        window.location.href = "/";
    };

    const register = async (data: RegisterFormData): AuthPromise => {
        try {
            setLoading(true);
            // Sending the user registration request.
            // await api.post("/users/", data);
            await registerUser(data);
            if (error) throw error;

            return { ok: true };
        } catch (error) {
            return onError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                logout,
                register,
                loading,
                restoring,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
