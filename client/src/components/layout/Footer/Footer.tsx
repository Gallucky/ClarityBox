import { useTheme } from "@app/providers/Theme/useTheme";
import GitHub from "@components/Icons/GitHub";
import LinkedIn from "@components/Icons/LinkedIn";
import CustomLink from "@/components/utils/CustomLink";

const Footer = () => {
    const { themeValue } = useTheme();
    const isDark = themeValue === "dark";

    return (
        <footer className="fixed bottom-0 max-sm:hidden!">
            <div className="flex w-full items-center justify-between px-52!">
                <p className="text-muted-foreground text-sm select-none hover:text-gray-500 dark:hover:text-gray-500">
                    2025 &copy; Gal Ben Abu
                </p>
                <div className="flex items-center gap-3">
                    <CustomLink
                        href={"https://github.com/Gallucky"}
                        ariaLabel="GitHub"
                        className="hover:text-accent!"
                    >
                        <GitHub color={isDark ? "white" : "black"} size={22} />
                    </CustomLink>
                    <CustomLink
                        href={"https://www.linkedin.com/in/gal-ben-abu/"}
                        ariaLabel="LinkedIn"
                        className="hover:text-accent!"
                    >
                        <LinkedIn
                            color={isDark ? "white" : "black"}
                            size={32}
                        />
                    </CustomLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
