import useAuth from "@app/providers/Auth/useAuth";
import { Separator } from "@components/ui/shadcn/separator";
import HomeCTA from "./components/HomeCTA";
import HomeFeatures from "./components/HomeFeatures";
import HomeHeroSection from "./components/HomeHeroSection";
import HomeUserFeatures from "./components/HomeUserFeatures";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="from-background via-background to-muted flex min-h-dvh w-full flex-col items-center justify-center bg-linear-to-br py-30!">
            <HomeHeroSection user={user} />
            <Separator className="my-10! w-[90dvw]!" />
            {!user && <HomeFeatures />}
            {user && <HomeUserFeatures user={user} />}
            <Separator className="my-10! w-[90dvw]!" />
            {!user && <HomeCTA />}
        </div>
    );
};

export default Home;
