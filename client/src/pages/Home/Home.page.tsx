import useAuth from "@/app/providers/Auth/useAuth";
import HomeCTA from "./components/HomeCTA";
import HomeFeatures from "./components/HomeFeatures";
import HomeHeroSection from "./components/HomeHeroSection";
import HomeUserFeatures from "./components/HomeUserFeatures";
import "./home.css";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="from-background via-background to-muted min-h-dvh w-full bg-linear-to-br pb-20">
            <HomeHeroSection user={user} />
            {!user && <HomeFeatures />}
            {user && <HomeUserFeatures user={user} />}
            {!user && <HomeCTA />}
        </div>
    );
};

export default Home;
