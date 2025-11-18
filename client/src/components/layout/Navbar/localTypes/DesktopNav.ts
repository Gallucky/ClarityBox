import type { LucideIcon } from "lucide-react";

export type DesktopNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
    dropDown?: boolean;
    icon?: LucideIcon;
    active?: boolean;
};
