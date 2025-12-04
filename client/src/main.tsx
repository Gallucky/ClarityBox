import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { RouterProvider } from "react-router-dom";
import AppProviders from "@app/providers/AppProviders.tsx";
import App from "./App";
// import router from "@app/router/router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            {/* <RouterProvider router={router} /> */}
            <App />
        </AppProviders>
    </StrictMode>,
);
