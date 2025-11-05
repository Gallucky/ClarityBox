import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppProviders from "@app/providers/AppProviders.tsx";
import router from "@app/router/router.tsx";
import "@styles/GlassCard.css";
import "@styles/fonts.css";
import "@styles/textUtils.css";
import "@styles/colors/variables.css";
import "@styles/colors/classes.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    </StrictMode>
);
