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
const useMediaQuery = (query: string): boolean => {
    // Initializing a state with the current result of the media query.
    // This runs once during the initial render.
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        // Creating a MediaQueryList object for the provided query.
        const media = window.matchMedia(query);

        // Defining a listener to update the state whenever the query result changes.
        const listener = () => setMatches(media.matches);

        // Adding the listener to respond to changes (e.g., window resize).
        media.addEventListener("change", listener);

        // Cleanup the listener when the component unmounts or the query changes.
        return () => media.removeEventListener("change", listener);
    }, [query]); // Re-run effect only if the query string changes.

    // Return the current match state.
    return matches;
};

export default useMediaQuery;
