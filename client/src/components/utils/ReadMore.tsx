import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";

type ReadMoreProps = {
    href?: string;
    icon?: JSX.Element;
    className?: string;
};

const ReadMore = (props: ReadMoreProps) => {
    const { href, icon, className } = props;
    const navigate = useNavigate();

    const classList = `
        text-primary text-fluid-0.75!
        absolute flex
        italic transition-all!
        duration-300 ease-in-out select-none
        hover:scale-95 hover:cursor-pointer hover:underline
        ${className}
    `;

    return (
        <span
            onClick={href ? () => navigate(href) : () => {}}
            className={classList}
            aria-label="Read More"
        >
            Read More {icon ? icon : <ArrowUpRight size={16} />}
        </span>
    );
};

export default ReadMore;
