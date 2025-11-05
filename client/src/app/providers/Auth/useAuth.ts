import { useContext } from "react";

import ProviderError from "@errors/providerError";

import AuthContext from "./AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new ProviderError("AuthProvider", "useAuth must be used within an AuthProvider");
    }
    return context;
};

export default useAuth;
