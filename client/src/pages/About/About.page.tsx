import { ScrollArea } from "@radix-ui/react-scroll-area";
import useAuth from "@/app/providers/Auth/useAuth";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutMissionSection from "./components/AboutMissionSection";
import AboutValuesSection from "./components/AboutValuesSection";

const About = () => {
    const { user } = useAuth();

    return (
        <ScrollArea className="from-background via-background to-muted inset-0 flex flex-col items-center justify-center gap-20 bg-linear-to-br py-20! pb-20">
            <AboutHeroSection />
            <AboutMissionSection />
            <AboutValuesSection />
            {/* <AboutFeaturesSection />
            <AboutTechSection />
            {user && <AboutRoleSection user={user} />}
            {!user && <AboutCTA />}
            <AboutFAQSection /> */}
        </ScrollArea>
    );
};

export default About;
