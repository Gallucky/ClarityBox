import { motion } from "framer-motion";
import { Menu, X, Book, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/models/User";
import { FieldSeparator } from "@components/ui/shadcn/field";
import ThemeToggle from "@components/ui/ThemeToggle";
import type { NavItem } from "./localTypes/NavItem";

type MobileNavProps = {
    user: User | null;
    logout: () => void;
    shownLinks: NavItem[];
    linkAction: (item: NavItem, index: number) => void;
    isCurrentLocation: (href: string, forNested?: boolean) => boolean;
};

const MobileNav = (props: MobileNavProps) => {
    const { user, logout, shownLinks, linkAction, isCurrentLocation } = props;
    const navigate = useNavigate();
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const hasMiddleName = user && user.name && user.name.middle ? true : false;

    const userFullName =
        (user &&
            user.name &&
            (hasMiddleName
                ? `${user.name.first} ${user.name.middle} ${user.name.last}`
                : `${user.name.first} ${user.name.last}`)) ||
        undefined;

    return (
        <>
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
                            onClick={() =>
                                linkAction(
                                    {
                                        href: "/about",
                                        label: "About",
                                    },
                                    -1,
                                )
                            }
                            className={`nav-item ${isCurrentLocation("/about") ? "active" : ""}`}
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

export default MobileNav;
