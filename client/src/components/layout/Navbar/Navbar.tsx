import useMediaQuery from "@hooks/useMediaQuery";
import useAuth from "@/app/providers/Auth/useAuth";
import CardNav from "./CardNav";
import MobileNav from "./MobileNav";
import type { CardNavItem } from "./localTypes/CardNav";
import type { MobileNavItem } from "./localTypes/MobileNav";

const Navbar = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const renderDock = (items: MobileNavItem[]) => <MobileNav items={items} />;

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
        const guestItems: MobileNavItem[] = [];
        const userItems: MobileNavItem[] = [];
        const adminExtras: MobileNavItem[] = [];

        if (!user) return renderDock(guestItems);
        if (!user.isAdmin) return renderDock(userItems);

        return renderDock([...userItems, ...adminExtras]);
    }

    const guestItems: CardNavItem[] = [];
    const userItems: CardNavItem[] = [];
    const adminExtras: CardNavItem[] = [];

    if (!user) return renderCardNav(guestItems);
    if (!user.isAdmin) return renderCardNav(userItems);

    return renderCardNav([...userItems, ...adminExtras]);
};

export default Navbar;
