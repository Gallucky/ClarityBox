type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    lightSource?: boolean;
};

const GlassCard = (props: GlassCardProps) => {
    const { children, className, lightSource = true } = props;

    return (
        <div className={`glass-card ${className}`}>
            {children}
            {lightSource && <div className="light-source" />}
        </div>
    );
};

export default GlassCard;
