import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/models/User";
import ThemeToggle from "@components/ui/ThemeToggle";
import type { NavItem } from "./localTypes/NavItem";

type DesktopNavProps = {
    user: User | null;
    logout: () => void;
    shownLinks: NavItem[];
};

const DesktopNav = (props: DesktopNavProps) => {
    const { user, logout, shownLinks } = props;
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const themeToggle = (
        <div
            className={`hover:bg-muted flex rounded p-1! ${user ? "me-3!" : "ms-3!"}`}
        >
            <ThemeToggle className="" />
        </div>
    );

    return (
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
                        onClick={() => setProfileDropdownOpen((prev) => !prev)}
                    >
                        <img
                            src={
                                user.profileImage?.url ||
                                "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
                            }
                            alt={user.profileImage?.alt || "User profile image"}
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
    );
};

export default DesktopNav;
