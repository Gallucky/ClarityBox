import { createContext } from "react";

import type { RegisterFormData } from "@/types/forms/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { User } from "@/types/User";

// Defining the date structure.
type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginPayload) => Promise<void>;
    logout: () => void;
    registerUser: (data: RegisterFormData) => Promise<void>;
    loading: boolean;
    error: Error | null;
};

// Creating the context.
/** @internal Do not import directly. Use `useAuth()` instead. */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
