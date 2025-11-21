import { createContext } from "react";

import type { AuthPromise } from "@/types/AuthPromise";
import type { RegisterFormData } from "@/types/forms/user/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { User } from "@/types/User";

// Defining the date structure.
type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginPayload) => AuthPromise;
    logout: () => void;
    register: (data: RegisterFormData) => AuthPromise;
    loading: boolean;
    restoring: boolean;
};

// Creating the context.
/** @internal Do not import directly. Use `useAuth()` instead. */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
