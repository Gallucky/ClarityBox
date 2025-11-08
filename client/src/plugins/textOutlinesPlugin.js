export default function ({ matchUtilities, theme }) {
    // text-outline-{color}
    matchUtilities(
        {
            "text-outline": (value) => ({
                "--outline-color": value,
            }),
        },
        {
            values: theme("colors"),
            type: "color",
        }
    );

    // text-outline-{width}
    matchUtilities(
        {
            "text-outline": (value) => ({
                "--outline-width": value,
            }),
        },
        {
            values: theme("borderWidth"),
        }
    );
}
