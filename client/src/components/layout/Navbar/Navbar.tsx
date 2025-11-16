import useMediaQuery from "@hooks/useMediaQuery";
import useAuth from "@/app/providers/Auth/useAuth";
import DesktopNav, { type DesktopNavItem } from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { MobileNavItem } from "./localTypes/MobileNav";

const Navbar = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");

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
        const guestItems: MobileNavItem[] = [
            { text: "Home", href: "/", link: true, active: true },
            { text: "About", href: "/about", link: true },
            { text: "Login", href: "/login", link: true },
            { text: "Register", href: "/registration", link: true },
        ];
        const userItems: MobileNavItem[] = [
            { text: "Home", href: "/", link: true, active: true },
            { text: "About", href: "/about", link: true },
            {
                text: "Gratitude Boxes",
                href: "/dashboard/gratitude-boxes",
                link: true,
            },
            { text: "Projects", href: "/projects", link: true },
            { text: "Profile", href: "/profile", link: true },
            { text: "Logout", href: "/", link: true },
        ];

        const adminExtras: MobileNavItem[] = [
            { text: "CRM", href: "/crm", link: true },
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
        },
        {
            label: "Register",
            href: "/registration",
            ariaLabel: "Register",
        },
    ];
    const userItems: DesktopNavItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
            ariaLabel: "Dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
            ariaLabel: "Projects",
        },
        {
            label: "Gratitude Boxes",
            href: "/gratitude-boxes",
            ariaLabel: "Gratitude Boxes",
        },
    ];
    const adminExtras: DesktopNavItem[] = [];

    if (!user) return renderCardNav(guestItems);
    if (!user.isAdmin) return renderCardNav(userItems);

    return renderCardNav([...userItems, ...adminExtras]);
};

export default Navbar;
