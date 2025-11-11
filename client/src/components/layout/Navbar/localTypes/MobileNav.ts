type MobileNavItemBase = {
    text: string;
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
};

type MobileNavItemLink = MobileNavItemBase & {
    link: true;
    href: string;
    onClick: () => void;
};

type MobileNavItemNonLink = MobileNavItemBase & {
    link?: false;
    href?: never;
    onClick?: never;
};

export type MobileNavItem = MobileNavItemLink | MobileNavItemNonLink;
