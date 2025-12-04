import { motion } from "framer-motion";
import {
    Book,
    BookOpen,
    Box,
    Key,
    LayoutDashboard,
    Lock,
    LogOut,
    Menu,
    Package,
    Search,
    Shield,
    User,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldSeparator } from "@/components/ui/shadcn/field";
import useAuth from "@app/providers/Auth/useAuth";
import ThemeToggle from "@components/ui/ThemeToggle";
import type { NavItem } from "./localTypes/NavItem";

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [shownLinks, setShownLinks] = useState<NavItem[]>([]);
    const [openMobileNav, setOpenMobileNav] = useState(false);

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

    const themeToggle = (
        <div
            className={`hover:bg-muted flex rounded p-1! ${user ? "me-3!" : "ms-3!"}`}
        >
            <ThemeToggle className="" />
        </div>
    );

    const hasMiddleName = user && user.name && user.name.middle ? true : false;

    const userFullName =
        (user &&
            user.name &&
            (hasMiddleName
                ? `${user.name.first} ${user.name.middle} ${user.name.last}`
                : `${user.name.first} ${user.name.last}`)) ||
        undefined;

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
            <nav className="desktop-navbar">
                <div className="static-content">
                    <abbr title="Click to go to home page">
                        <img
                            src={"/claritybox-logo.svg"}
                            alt={"ClarityBox's logo"}
                            onClick={() => navigate("/")}
                        />
                    </abbr>
                    <button
                        type="button"
                        className={`link ${location.pathname === "/about" ? "active" : ""}`}
                        aria-label="static-link-about"
                        onClick={() => navigate("/about")}
                    >
                        <BookOpen className="size-4" />
                        About
                    </button>
                    <Search className="search-icon" />
                </div>

                {!user && themeToggle}

                <ul className={`links ${!user ? "links-right" : ""}`}>
                    {shownLinks.map((link, index) => {
                        const Icon = link.icon ? link.icon : null;
                        return (
                            <li
                                key={index}
                                className="flex items-center justify-center"
                            >
                                <button
                                    type="button"
                                    className={`link ${link.active ? "active" : ""}`}
                                    aria-label={link.ariaLabel}
                                    onClick={() => navigate(link.href)}
                                >
                                    {Icon && <Icon className="size-4" />}{" "}
                                    {link.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {user && themeToggle}

                {user && (
                    <div className="profile-container">
                        <div
                            className="profile"
                            onClick={() =>
                                setProfileDropdownOpen((prev) => !prev)
                            }
                        >
                            <img
                                src={
                                    user.profileImage?.url ||
                                    "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
                                }
                                alt={
                                    user.profileImage?.alt ||
                                    "User profile image"
                                }
                            />
                        </div>

                        {/* 3. Move the dropdown *inside* this wrapper */}
                        {profileDropdownOpen && (
                            <div className="profile-dropdown">
                                <button
                                    type="button"
                                    className="link"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    className="link"
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <button
                onClick={() => setOpenMobileNav(!openMobileNav)}
                className="absolute top-3 right-5 z-50 lg:hidden"
            >
                <Menu className="text-foreground size-6" />
            </button>

            <div
                id="navbar-overlay"
                className={`${openMobileNav ? "static" : "hidden"}`}
                onClick={() => {
                    setOpenMobileNav(false);
                }}
            />

            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: openMobileNav ? 0 : "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 z-50 w-[65dvw] p-6 shadow-lg lg:hidden"
            >
                <div className="mobile-navbar">
                    <div className="mobile-navbar-header">
                        <img
                            src="claritybox-logo.svg"
                            alt="ClarityBox's Logo"
                            className="logo"
                        />
                        <div className="user-profile">
                            <img
                                src={
                                    user &&
                                    user.profileImage &&
                                    user.profileImage.url
                                        ? user.profileImage.url
                                        : "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
                                }
                                alt={
                                    user &&
                                    user.profileImage &&
                                    user.profileImage.alt
                                        ? user.profileImage.alt
                                        : "User profile image"
                                }
                            />

                            <div className="user-info text-fluid-2!">
                                <span className="user-nickname">
                                    {user?.nickname}
                                </span>
                                <span className="user-name max-sm:text-fluid-0.75!">
                                    {userFullName
                                        ? `Hello, ${userFullName}!`
                                        : "Hello there!"}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpenMobileNav(false)}
                            className="absolute top-3 right-3"
                        >
                            <X className="size-6" />
                        </button>

                        <ThemeToggle className="mx-auto!" />
                    </div>
                    <FieldSeparator className="my-5!" />
                    <ul className="nav-items list-none">
                        {/* Nav Links */}
                        <li
                            key={"About"}
                            onClick={() => navigate("/about")}
                            className={`nav-item`}
                        >
                            <span
                                aria-label="About Navbar Link"
                                className="nav-text text-secondary! flex items-center justify-center gap-2"
                            >
                                <Book className="size-6" />
                                About
                            </span>
                        </li>
                        {shownLinks.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => linkAction(item, index)}
                                className={`nav-item ${item.active ? "active" : ""}`}
                            >
                                <span
                                    aria-label={item.ariaLabel}
                                    className="nav-text text-secondary! flex items-center justify-center gap-2"
                                >
                                    {item.icon && (
                                        <item.icon className="size-6" />
                                    )}
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <li
                        key={"logout-mobile-nav"}
                        onClick={() => {
                            logout();
                            navigate("/");
                            setOpenMobileNav(false);
                        }}
                        className={`nav-item absolute bottom-10`}
                    >
                        <span
                            aria-label="logout mobile navbar link"
                            className="nav-text text-accent! flex items-center justify-center gap-2"
                        >
                            <LogOut className="size-6" />
                            Logout
                        </span>
                    </li>

                    <div className="mobile-navbar-footer text-fluid! text-center">
                        ClarityBox © 2025 - Gal Ben Abu
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Navbar;
