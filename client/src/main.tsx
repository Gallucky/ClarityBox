import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProviders from "@app/providers/AppProviders.tsx";
import { RouterProvider } from "react-router-dom";
import router from "@app/router/router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    </StrictMode>
);
