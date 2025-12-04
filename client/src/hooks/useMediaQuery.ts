import { useState, useEffect } from "react";

/**
 * A custom React hook that returns `true` or `false` based on a given media query.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 *
 * When the viewport width is 768px or less, `isMobile` will be true.
 * The hook listens for viewport size changes in real time.
 */
const useMediaQuery = (
    query: string,
    defaultValue: boolean = false,
): boolean => {
    const [matches, setMatches] = useState(defaultValue);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
};

export default useMediaQuery;
