import { PlusIcon } from "lucide-react";
import type { JSX } from "react";

type FloatingButtonProps = {
    icon?: JSX.Element;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

const FloatingButton = (props: FloatingButtonProps) => {
    const { icon, className, onClick, disabled } = props;

    const onClickHandlerWrapper = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick();

        const btn = e.currentTarget;
        btn.classList.add("click-ping");

        setTimeout(() => {
            btn.classList.remove("click-ping");

            btn.classList.add("click-in");

            setTimeout(() => {
                btn.classList.remove("click-in");
            }, 400);
        }, 600);
    };

    const handleHoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;

        btn.classList.add("scale-down");

        setTimeout(() => {
            btn.classList.remove("scale-down");
        }, 1000);
    };

    const handleHoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;

        btn.classList.add("scale-up");

        setTimeout(() => {
            btn.classList.remove("scale-up");
        }, 1000);
    };

    return (
        <button
            data-slot="floating-button"
            type="button"
            disabled={disabled}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            className={`bg-secondary scale-down disabled:bg-secondary/50 absolute right-30 bottom-20 z-50 flex size-20 items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:blur-[1px] ${className}`}
            onClick={(e) => onClickHandlerWrapper(e)}
        >
            {icon ? icon : <PlusIcon size={50} />}
        </button>
    );
};

export default FloatingButton;
