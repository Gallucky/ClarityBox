// useRestoreSession.ts
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import type { Token } from "@/types/Token";
import { isTokenExpired } from "./isTokenExpired";

type RestoreSessionProps = {
    api: any;
    setUser: (user: any) => void;
    setToken: (token: any) => void;
    setLoading: (loading: boolean) => void;
    setRestoring: (restoring: boolean) => void;
};

const useRestoreSession = (props: RestoreSessionProps) => {
    const { api, setUser, setToken, setLoading, setRestoring } = props;

    useEffect(() => {
        const restoreSession = async () => {
            // const { token: storedToken, decodedToken, status } = getStoredToken();

            // If there is an error skipping because that means the token is expired/invalid/missing.
            // if (status || !storedToken || !decodedToken) return;

            const token = localStorage.getItem("token");

            // If there is no token, there is nothing to restore.
            if (!token) {
                setRestoring(false);
                return;
            }

            try {
                // Decoding the token.
                const decodedToken = jwtDecode<Token>(token);

                // If one of the required fields is missing, the token is invalid.
                if (!decodedToken._id || !decodedToken.iat || !decodedToken.exp)
                    throw new Error("Token is invalid.");

                // If the token is expired, the token is no longer valid.
                if (isTokenExpired(decodedToken)) throw new Error("Token is expired.");

                // Loading the token.
                setLoading(true);
                setToken(token);

                // Fetching the user data.
                // Getting the data from the API.
                // It is called user the same as the user
                // state value so the returned data is renamed to userData.
                api.addHeader("x-auth-token", token);
                const user = await api.get(`/users/${decodedToken._id}`);
                setUser(user ?? null);

                return { ok: true };
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                api.removeHeader("x-auth-token");
            } finally {
                setRestoring(false);
                setLoading(false);
            }
        };
        void restoreSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);
};

export default useRestoreSession;
