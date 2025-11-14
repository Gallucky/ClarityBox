import useMediaQuery from "@hooks/useMediaQuery";
import useAuth from "@/app/providers/Auth/useAuth";
import CardNav from "./CardNav";
import MobileNav from "./MobileNav";
import type { CardNavItem } from "./localTypes/CardNav";
import type { MobileNavItem } from "./localTypes/MobileNav";

const Navbar = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const renderMobileNav = (items: MobileNavItem[]) => (
        <MobileNav items={items} />
    );

    const renderCardNav = (items: CardNavItem[]) => (
        <CardNav
            logo={"/claritybox-icon.svg"}
            logoAlt="ClarityBox's Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
        />
    );

    // Mobile Mode.
    if (isMobile) {
        const guestItems: MobileNavItem[] = [
            { text: "Home", href: "/", link: true, active: true },
            { text: "About", href: "/", link: true },
            { text: "Login", href: "/", link: true },
            { text: "Register", href: "/", link: true },
        ];
        const userItems: MobileNavItem[] = [
            { text: "Home", href: "/", link: true, active: true },
            { text: "About", href: "/", link: true },
            { text: "Gratitude Boxes", href: "/", link: true },
            { text: "Projects", href: "/", link: true },
            { text: "Search Public Gratitude Boxes", href: "/", link: true },
            { text: "Settings", href: "/", link: true },
            { text: "Logout", href: "/", link: true },
        ];
        const adminExtras: MobileNavItem[] = [];

        if (!user) return renderMobileNav(guestItems);
        if (!user.isAdmin) return renderMobileNav(userItems);

        return renderMobileNav([...userItems, ...adminExtras]);
    }

    const guestItems: CardNavItem[] = [];
    const userItems: CardNavItem[] = [];
    const adminExtras: CardNavItem[] = [];

    if (!user) return renderCardNav(guestItems);
    if (!user.isAdmin) return renderCardNav(userItems);

    return renderCardNav([...userItems, ...adminExtras]);
};

export default Navbar;
