import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

// Custom rules
const rules = {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "max-lines": ["error", { max: 200, skipBlankLines: true, skipComments: true }],
    "no-undef": "off",
};

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules,
    },
    {
        files: ["**/*.js"],
        languageOptions: { sourceType: "commonjs" },
    },
]);
