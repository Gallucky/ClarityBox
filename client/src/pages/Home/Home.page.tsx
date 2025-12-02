import useAuth from "@/app/providers/Auth/useAuth";
import HomeHeroSection from "./components/HomeHeroSection";
import HomeFeatures from "./components/HomeFeatures";
import HomeUserFeatures from "./components/HomeUserFeatures";
import HomeCTA from "./components/HomeCTA";
import "./home.css";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-dvh w-full bg-gradient-to-br from-background via-background to-muted pb-20">
            <HomeHeroSection user={user} />
            {!user && <HomeFeatures />}
            {user && <HomeUserFeatures user={user} />}
            {!user && <HomeCTA />}
        </div>
    );
};

export default Home;
