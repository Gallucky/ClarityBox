type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    lightSource?: boolean;
    centered?: boolean;
};

const GlassCard = (props: GlassCardProps) => {
    const { children, className, lightSource = true, centered = false } = props;

    const centeredClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

    return (
        <div className={`glass-card ${className} ${centered ? centeredClasses : ""}`}>
            {children}
            {lightSource && <div className="light-source" />}
        </div>
    );
};

export default GlassCard;
