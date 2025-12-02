import useAuth from "@/app/providers/Auth/useAuth";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutMissionSection from "./components/AboutMissionSection";

const About = () => {
    const { user } = useAuth();

    return (
        <div className="from-background via-background to-muted absolute-center flex min-h-dvh w-dvw flex-col items-center justify-center gap-20 bg-linear-to-br pb-20">
            <AboutHeroSection />
            <AboutMissionSection />
            {/* <AboutValuesSection />
            <AboutFeaturesSection />
            <AboutTechSection />
            {user && <AboutRoleSection user={user} />}
            {!user && <AboutCTA />}
            <AboutFAQSection /> */}
        </div>
    );
};

export default About;
