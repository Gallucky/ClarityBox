import { Navigate } from "react-router-dom";
import useAuth from "@app/providers/Auth/useAuth";
import Spinner from "@components/ui/Spinner";
import type { ReactNode } from "react";

type Role = "guest" | "authenticated" | "admin";

type RouteGuardProps = {
    children: ReactNode;

    role?: Role;
};

const RouteGuard = (props: RouteGuardProps) => {
    const { children, role } = props;
    const { user, loading } = useAuth();

    // Wait for the user to be loaded.
    if (loading) return <Spinner />;

    // If there are no restrictions skip checking.
    const noRestrictions = !role;
    if (noRestrictions) return <>{children}</>;

    // Guest routes
    if (role === "guest") {
        // An authenticated user does not need and
        // should not be able to access guest routes.
        // e.g. the login and registration pages.
        if (user) return <Navigate to="/" replace />;
        return <>{children}</>;
    }

    // Authenticated routes
    if (role === "authenticated") {
        // A guest user should not and could not be able to access
        // authenticated users routes.
        if (!user) return <Navigate to="/login" replace />;
        return <>{children}</>;
    }

    // Admin-only routes
    if (role === "admin") {
        // A guest user should not and could not be able to access
        // admin-only routes.
        if (!user) return <Navigate to="/login" replace />;
        // An authenticated user should not and could not be able to access
        // admin-only routes without admin permissions.
        if (!user.isAdmin) return <Navigate to="/" replace />;
        return <>{children}</>;
    }

    // Fallback should never be reached.
    return <Navigate to="/" replace />;
};

export default RouteGuard;
