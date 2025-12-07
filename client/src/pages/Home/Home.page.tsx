import useAuth from "@app/providers/Auth/useAuth";
import HomeHeroSection from "./components/HomeHeroSection";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="from-background via-background to-muted min-h-dvh w-full bg-linear-to-br">
            <HomeHeroSection user={user} />
            {/* {!user && <HomeFeatures />}
            {user && <HomeUserFeatures user={user} />}
            {!user && <HomeCTA />} */}
        </div>
    );
};

export default Home;
