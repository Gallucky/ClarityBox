import { useEffect, useMemo, useState, type ReactNode } from "react";

import { toast } from "react-toastify";

import type { Auth, AuthPromise } from "@/types/AuthPromise";
import type { RegisterFormData } from "@/types/forms/user/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { LoginResponse } from "@/types/LoginResponse";
import type { User } from "@/types/models/User";

import { parseError } from "@/utils/parseError";
import useQuery from "@app/providers/Query/useQuery";
import useUsers from "@hooks/api/useUsers";
import AuthContext from "./AuthContext";

// Defining the context's provider's props.
type AuthProviderProps = {
    children: ReactNode;
};

type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    restoring: boolean;
    isInitialized: boolean;
};

const getInitialState = (): AuthState => {
    const token = localStorage.getItem("token");
    return {
        user: null,
        token: token,
        loading: false,
        restoring: !!token,
        isInitialized: !token,
    };
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

    const [state, setState] = useState<AuthState>(getInitialState);
    const { user, token, loading, restoring, isInitialized } = state;

    useEffect(() => {
        if (token && restoring) {
            const restoreSession = async () => {
                try {
                    // Call your actual /users/me endpoint here
                    // Example: const userData = await api.get('/users/me');

                    // For now, assuming you have a way to fetch current user:
                    // Replace this with your actual API call
                    api.addHeader("x-auth-token", token);
                    // const userData = await fetchCurrentUser(); // Your method here

                    setState((s) => ({
                        ...s,
                        // user: userData, // Uncomment when you have the API call
                        restoring: false,
                        isInitialized: true,
                    }));
                } catch (e) {
                    // Token is invalid, clear it
                    localStorage.removeItem("token");
                    setState((s) => ({
                        ...s,
                        token: null,
                        restoring: false,
                        isInitialized: true,
                    }));
                }
            };
            restoreSession();
        }
    }, [token, restoring, api]);

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

        // FIX: Call toast immediately to prevent race condition
        toast.error(parsedError.message);

        return { ok: false, error: parsedError };
    };

    const { loginUser, registerUser, error } = useUsers();

    // The auth methods.
    const login = async (credentials: LoginPayload): AuthPromise => {
        try {
            // Single state update for loading
            setState((s) => ({ ...s, loading: true }));

            api.removeHeader("x-auth-token");

            const LoginResponse: LoginResponse = await loginUser(credentials);

            // Save to localStorage
            localStorage.setItem("token", LoginResponse.token);

            // Single consolidated state update
            setState((s) => ({
                ...s,
                token: LoginResponse.token,
                user: LoginResponse.user ?? null,
                loading: false,
            }));

            return { ok: true };
        } catch (error: any) {
            const result = onError(error);
            // Ensure loading is reset on error
            setState((s) => ({ ...s, loading: false }));
            return result;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        api.removeHeader("x-auth-token");

        setState((s) => ({
            ...s,
            token: null,
            user: null,
            loading: false,
            restoring: false,
        }));

        toast.success("Logged out successfully!");
        window.location.href = "/";
    };

    const register = async (data: RegisterFormData): AuthPromise => {
        try {
            setState((s) => ({ ...s, loading: true }));
            // Sending the user registration request.
            // await api.post("/users/", data);
            await registerUser(data);

            return { ok: true };
        } catch (error) {
            return onError(error);
        } finally {
            setState((s) => ({ ...s, loading: false }));
        }
    };

    // Memoizing to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            login,
            logout,
            register,
            loading,
            restoring,
        }),
        [
            user,
            token,
            isAuthenticated,
            login,
            logout,
            register,
            loading,
            restoring,
        ],
    );

    // Preventing rendering children during restoration
    if (restoring && !isInitialized) {
        return null; // Or return <LoadingSpinner />
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
