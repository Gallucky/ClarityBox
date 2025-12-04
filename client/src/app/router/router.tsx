// router.tsx is like a traffic controller.

import { createBrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import AnimatedLayout from "@components/layout/AnimatedLayout";
import { lazyImport, lazyImportPage, lazyLoad } from "@utils/lazyLoad";
import RouteGuard from "./RouteGuard";

const Home = lazyImportPage("Home");
const About = lazyImportPage("About");
const Login = lazyImportPage("Login");
const Registration = lazyImportPage("Registration");
const Dashboard = lazyImportPage("Dashboard");
const Projects = lazyImportPage("Projects");
const Gratitude = lazyImportPage("Gratitude");
const GratitudeBoxDetails = lazyImport(
    "../pages/Gratitude/components/GratitudeBoxDetails.tsx",
);
const Admin = lazyImportPage("Admin");
const Profile = lazyImportPage("Profile");
const ErrorPage = lazyImportPage("Error");

// Todo: Remove the Playground page.
const PlaygroundPage = lazyImportPage("Playground");

const router = createBrowserRouter([
    {
        // The static elements/components that will always be rendered.
        element: <App />,
        children: [
            {
                element: <AnimatedLayout />,
                children: [
                    { path: "/", element: lazyLoad(Home) },
                    { path: "/home", element: lazyLoad(Home) },
                    { path: "/about", element: lazyLoad(About) },
                    { path: "/playground", element: lazyLoad(PlaygroundPage) },
                    {
                        // GuestOnly
                        path: "/login",
                        element: (
                            <RouteGuard role="guest">
                                {lazyLoad(Login)}
                            </RouteGuard>
                        ),
                    },
                    {
                        // GuestOnly
                        path: "/registration",
                        element: (
                            <RouteGuard role="guest">
                                {lazyLoad(Registration)}
                            </RouteGuard>
                        ),
                    },
                    {
                        // Dashboard
                        path: "/dashboard",
                        element: (
                            <RouteGuard role="authenticated">
                                {lazyLoad(Dashboard)}
                            </RouteGuard>
                        ),
                    },

                    {
                        // Projects
                        path: "/projects",
                        element: (
                            <RouteGuard role="authenticated">
                                {lazyLoad(Projects)}
                            </RouteGuard>
                        ),
                    },

                    {
                        // Gratitude Boxes
                        path: "/gratitude-boxes",
                        element: (
                            <RouteGuard role="authenticated">
                                {lazyLoad(Gratitude)}
                            </RouteGuard>
                        ),
                    },
                    {
                        // Gratitude Boxes details
                        path: "/gratitude-boxes/:id",
                        element: (
                            <RouteGuard role="authenticated">
                                {lazyLoad(GratitudeBoxDetails)}
                            </RouteGuard>
                        ),
                    },
                    {
                        // Allowed for admin
                        path: "/crm",
                        element: (
                            <RouteGuard role="admin">
                                {lazyLoad(Admin)}
                            </RouteGuard>
                        ),
                    },
                    {
                        // Allowed for logged in users
                        path: "/profile",
                        element: (
                            <RouteGuard role="authenticated">
                                {lazyLoad(Profile)}
                            </RouteGuard>
                        ),
                    },
                    { path: "*", element: lazyLoad(ErrorPage) },
                ],
            },
        ],
    },
]);

export default router;
