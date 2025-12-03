import { Box, LayoutDashboard, Package, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import useAuth from "@/app/providers/Auth/useAuth";
import useMediaQuery from "@hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { DesktopNavItem } from "./localTypes/DesktopNav";
import type { MobileNavItem } from "./localTypes/MobileNav";

const Navbar = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const location = useLocation();

    const isCurrentLocation = (href: string, forNested = false): boolean => {
        if (forNested) return location.pathname.startsWith(href);
        return location.pathname === href;
    };

    const renderMobileNav = (items: MobileNavItem[]) => (
        <MobileNav items={items} />
    );

    const renderCardNav = (items: DesktopNavItem[]) => (
        <DesktopNav
            logo={"/claritybox-logo.svg"}
            logoAlt="ClarityBox's Logo"
            links={items}
        />
    );

    // Mobile Mode.
    if (isMobile) {
        const staticItems: MobileNavItem[] = [
            {
                text: "Home",
                link: false,
                active: isCurrentLocation("/"),
            },
            {
                text: "About",
                link: false,
                active: isCurrentLocation("/about"),
            },
        ];

        const guestItems: MobileNavItem[] = [
            ...staticItems,
            {
                text: "Login",
                link: false,
                active: isCurrentLocation("/login"),
            },
            {
                text: "Register",
                link: false,
                active: isCurrentLocation("/registration"),
            },
        ];
        const userItems: MobileNavItem[] = [
            ...staticItems,
            {
                text: "Gratitude Boxes",
                link: false,
                active: isCurrentLocation("/gratitude-boxes"),
            },
            {
                text: "Projects",
                link: false,
                active: isCurrentLocation("/projects"),
            },
            {
                text: "Profile",
                link: false,
                active: isCurrentLocation("/profile"),
            },
            { text: "Logout", link: false },
        ];

        const adminExtras: MobileNavItem[] = [
            {
                text: "CRM",
                link: false,
                active: isCurrentLocation("/crm"),
            },
        ];

        if (!user) return renderMobileNav(guestItems);
        if (!user.isAdmin) return renderMobileNav(userItems);

        return renderMobileNav([...userItems, ...adminExtras]);
    }

    const guestItems: DesktopNavItem[] = [
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
    const userItems: DesktopNavItem[] = [
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
    const adminExtras: DesktopNavItem[] = [
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
