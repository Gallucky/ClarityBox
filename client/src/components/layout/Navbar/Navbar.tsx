import {
    Box,
    Key,
    LayoutDashboard,
    Lock,
    Package,
    Shield,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@app/providers/Auth/useAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { NavItem } from "./localTypes/NavItem";

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [shownLinks, setShownLinks] = useState<NavItem[]>([]);

    const isCurrentLocation = (href: string, forNested = false): boolean => {
        if (forNested) return location.pathname.startsWith(href);
        return location.pathname === href;
    };

    const guestLinks: NavItem[] = [
        {
            label: "Login",
            href: "/login",
            active: isCurrentLocation("/login"),
            ariaLabel: "Login Navbar Link",
            icon: Key,
        },
        {
            label: "Register",
            href: "/registration",
            active: isCurrentLocation("/registration"),
            ariaLabel: "Register Navbar Link",
            icon: Lock,
        },
    ];

    const userLinks: NavItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
            active: isCurrentLocation("/dashboard"),
            ariaLabel: "Dashboard Navbar Link",
            icon: LayoutDashboard,
        },
        {
            label: "Gratitude Boxes",
            href: "/gratitude-boxes",
            active: isCurrentLocation("/gratitude-boxes"),
            ariaLabel: "Gratitude Boxes Navbar Link",
            icon: Box,
        },
        {
            label: "Projects",
            href: "/projects",
            active: isCurrentLocation("/projects"),
            ariaLabel: "Projects Navbar Link",
            icon: Package,
        },
        {
            label: "Profile",
            href: "/profile",
            active: isCurrentLocation("/profile"),
            ariaLabel: "Profile Navbar Link",
            icon: User,
        },
        // Todo: Logout
    ];

    const adminLinks: NavItem[] = [
        {
            label: "CRM",
            href: "/crm",
            active: isCurrentLocation("/crm"),
            ariaLabel: "CRM Navbar Link",
            icon: Shield,
        },
    ];

    useEffect(() => {
        if (user && user.isAdmin) {
            setShownLinks([...userLinks, ...adminLinks]);
        } else if (user) {
            setShownLinks([...userLinks]);
        } else {
            setShownLinks([...guestLinks]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const linkAction = (item: NavItem, index: number) => {
        if (!item.href) return;

        const updatedItems = shownLinks.map((navItem, i) =>
            i === index
                ? { ...navItem, active: true }
                : { ...navItem, active: false },
        );

        setShownLinks(updatedItems);

        // Navigating.
        navigate(item.href);
    };

    return (
        <>
            <DesktopNav logout={logout} shownLinks={shownLinks} user={user} />
            <MobileNav
                logout={logout}
                linkAction={linkAction}
                user={user}
                shownLinks={shownLinks}
                isCurrentLocation={isCurrentLocation}
            />
        </>
    );
};

export default Navbar;
