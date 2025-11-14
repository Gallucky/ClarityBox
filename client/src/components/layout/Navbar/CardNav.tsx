type CardNavLink = {
    label: string;
    href: string;
    ariaLabel?: string;
};

type CardNavItem = {
    label: string;
    links: CardNavLink[];
    areaLabel?: string;
};

type CardNavProps = {
    cards: CardNavItem[];
    logo: string;
    logoAlt: string;
};

const CardNav = (props: CardNavProps) => {
    return (
        <>
            <div className="card-navbar">
                <div className="hamburger-icon" />
                <img src={props.logo} alt={props.logoAlt} />
                <div className="quick-action-buttons">
                    <button type="button">Home</button>
                </div>
            </div>
        </>
    );
};

export default CardNav;
