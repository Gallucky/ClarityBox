import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { FieldSeparator } from "@/components/ui/shadcn/field";
import type { MobileNavItem } from "./localTypes/MobileNav";

import "./mobileNavbar.css";

type MobileNavProps = {
    items: MobileNavItem[];
};

const MobileNav = (props: MobileNavProps) => {
    const { items } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="absolute top-3 right-5 z-50"
            >
                <Menu className="size-6" />
            </button>

            <div
                id="navbar-overlay"
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
                        <div className="h-20 w-full">
                            <img
                                src="claritybox-logo.svg"
                                alt="ClarityBox's Logo"
                                className="logo"
                            />

                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3"
                            >
                                <X className="size-6" />
                            </button>
                        </div>
                    </div>
                    <FieldSeparator />
                    <ul className="nav-items list-none">
                        {/* Nav Links */}
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.link ? (
                                    <a
                                        href={item.href}
                                        aria-label={item.ariaLabel}
                                        className="nav-item nav-link"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <span
                                        aria-label={item.ariaLabel}
                                        className="nav-item"
                                    >
                                        {item.text}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <FieldSeparator />
                    <div className="mobile-navbar-footer"></div>
                </div>
            </motion.aside>
        </>
    );
};

export default MobileNav;
