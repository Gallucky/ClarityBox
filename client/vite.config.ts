import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@errors": path.resolve(__dirname, "./src/errors"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@schemas": path.resolve(__dirname, "./src/schemas"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        port: Number(process.env.VITE_PORT) || 3000,
        host: "0.0.0.0",
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: "dist",
    },
    preview: {
        port: Number(process.env.VITE_PORT) || 3000,
        host: "0.0.0.0",
    },
});
