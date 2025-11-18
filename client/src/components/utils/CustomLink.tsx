import type { ReactNode } from "react";

type CustomLinkProps = {
    href: string;
    ariaLabel?: string;
    children?: ReactNode;
    className?: string;
};

const CustomLink = (props: CustomLinkProps) => {
    const { href, ariaLabel, children, className } = props;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-muted-foreground hover:text-foreground transition-colors ${className}`}
            aria-label={ariaLabel}
        >
            {children}
        </a>
    );
};

export default CustomLink;
