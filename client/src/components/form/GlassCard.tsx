type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
};

const GlassCard = (props: GlassCardProps) => {
    const { children, className } = props;

    return (
        <div className={`glass-card ${className}`}>
            {children}
            <div className="light-source" />
        </div>
    );
};

export default GlassCard;
