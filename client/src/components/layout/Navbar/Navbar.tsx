import { Box, LayoutDashboard, Package, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import useAuth from "@/app/providers/Auth/useAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { NavItem } from "./localTypes/NavItem";

const Navbar = () => {
    const { user } = useAuth();
    const isMobile = false; //useMediaQuery("(max-width: 768px)");
    const location = useLocation();

    const isCurrentLocation = (href: string, forNested = false): boolean => {
        if (forNested) return location.pathname.startsWith(href);
        return location.pathname === href;
    };

    const renderMobileNav = (items: NavItem[]) => <MobileNav items={items} />;

    const renderCardNav = (items: NavItem[]) => (
        <DesktopNav
            logo={"/claritybox-logo.svg"}
            logoAlt="ClarityBox's Logo"
            links={items}
        />
    );

    // Mobile Mode.
    if (isMobile) {
        const staticItems: NavItem[] = [
            {
                label: "Home",
                href: "/",
                active: isCurrentLocation("/"),
            },
            {
                label: "About",
                href: "/about",
                active: isCurrentLocation("/about"),
            },
        ];

        const guestItems: NavItem[] = [
            ...staticItems,
            {
                label: "Login",
                href: "/login",
                active: isCurrentLocation("/login"),
            },
            {
                label: "Register",
                href: "/registration",
                active: isCurrentLocation("/registration"),
            },
        ];
        const userItems: NavItem[] = [
            ...staticItems,
            {
                label: "Gratitude Boxes",
                href: "/gratitude-boxes",
                active: isCurrentLocation("/gratitude-boxes"),
            },
            {
                label: "Projects",
                href: "/projects",
                active: isCurrentLocation("/projects"),
            },
            {
                label: "Profile",
                href: "/profile",
                active: isCurrentLocation("/profile"),
            },
            { label: "Logout", href: "/" },
        ];

        const adminExtras: NavItem[] = [
            {
                label: "CRM",
                href: "/crm",
                active: isCurrentLocation("/crm"),
            },
        ];

        if (!user) return renderMobileNav(guestItems);
        if (!user.isAdmin) return renderMobileNav(userItems);

        return renderMobileNav([...userItems, ...adminExtras]);
    }

    const guestItems: NavItem[] = [
        {
            label: "Login",
            href: "/login",
            ariaLabel: "Login",
            active: isCurrentLocation("/login"),
        },
        {
            label: "Register",
            href: "/registration",
            ariaLabel: "Register",
            active: isCurrentLocation("/registration"),
        },
    ];
    const userItems: NavItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
            ariaLabel: "Dashboard",
            icon: LayoutDashboard,
            active: isCurrentLocation("/dashboard"),
        },
        {
            label: "Projects",
            href: "/projects",
            ariaLabel: "Projects",
            icon: Package,
            active: isCurrentLocation("/projects", true),
        },
        {
            label: "Gratitude Boxes",
            href: "/gratitude-boxes",
            ariaLabel: "Gratitude Boxes",
            icon: Box,
            active: isCurrentLocation("/gratitude-boxes", true),
        },
    ];
    const adminExtras: NavItem[] = [
        {
            label: "CRM",
            href: "/crm",
            ariaLabel: "crm",
            icon: Shield,
            active: isCurrentLocation("/crm"),
        },
    ];

    if (!user) return renderCardNav(guestItems);
    if (!user.isAdmin) return renderCardNav(userItems);

    return renderCardNav([...userItems, ...adminExtras]);
};

export default Navbar;
