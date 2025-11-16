import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/app/providers/Auth/useAuth";

export type DesktopNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
    dropDown?: boolean;
};

type DesktopNavProps = {
    links: DesktopNavItem[];
    logo: string;
    logoAlt: string;
};

const DesktopNav = (props: DesktopNavProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <>
            <nav className="desktop-navbar">
                <div className="static-content">
                    <img src={props.logo} alt={props.logoAlt} />
                    <button
                        type="button"
                        className="link active"
                        aria-label="static-link-about"
                        onClick={() => navigate("/about")}
                    >
                        About
                    </button>
                    <Search />
                </div>
                <ul className="links">
                    {props.links.map((link, index) => {
                        return (
                            <li key={index}>
                                <button
                                    type="button"
                                    className="link"
                                    aria-label={link.ariaLabel}
                                    onClick={() => navigate(link.href)}
                                >
                                    {link.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {user && (
                    <div className="profile">
                        <img
                            src={
                                user?.profileImage?.url ||
                                "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
                            }
                            alt={
                                user?.profileImage?.alt || "User profile image"
                            }
                        />
                    </div>
                )}
            </nav>
        </>
    );
};

export default DesktopNav;
