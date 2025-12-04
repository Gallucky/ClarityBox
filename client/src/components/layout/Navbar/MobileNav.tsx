import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@app/providers/Auth/useAuth";
import { FieldSeparator } from "@components/ui/shadcn/field";
import type { NavItem } from "./localTypes/NavItem";

type MobileNavProps = {
    items: NavItem[];
};

const MobileNav = (props: MobileNavProps) => {
    const { items } = props;
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const hasMiddleName = user && user.name && user.name.middle ? true : false;

    const userFullName =
        (user &&
            user.name &&
            (hasMiddleName
                ? `${user.name.first} ${user.name.middle} ${user.name.last}`
                : `${user.name.first} ${user.name.last}`)) ||
        undefined;

    const [currentItems, setCurrentItems] = useState<NavItem[]>(items);

    const linkAction = (item: NavItem, index: number) => {
        if (!item.href) return;

        const updatedItems = currentItems.map((navItem, i) =>
            i === index
                ? { ...navItem, active: true }
                : { ...navItem, active: false },
        );

        setCurrentItems(updatedItems);

        // Navigating.
        navigate(item.href);
    };

    useEffect(() => {
        setCurrentItems(items);
    }, [items]);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="absolute top-3 right-5 z-50"
            >
                <Menu className="size-6" color="black" />
            </button>

            <div
                id="navbar-overlay"
                className={`${open ? "static" : "hidden"}`}
                onClick={() => {
                    setOpen(false);
                }}
            />

            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: open ? 0 : "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 z-50 w-[65dvw] p-6 shadow-lg"
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
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                    <FieldSeparator className="my-5!" />
                    <ul className="nav-items list-none">
                        {/* Nav Links */}
                        {currentItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => linkAction(item, index)}
                                className={`nav-item ${item.active ? "active" : ""}`}
                            >
                                <span
                                    aria-label={item.ariaLabel}
                                    className="nav-text"
                                >
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <FieldSeparator className="my-5!" />
                    <div className="mobile-navbar-footer text-fluid! text-center">
                        ClarityBox © 2025 - Gal Ben Abu
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default MobileNav;
