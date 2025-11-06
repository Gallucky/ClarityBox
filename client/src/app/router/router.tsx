// router.tsx is like a traffic controller.

import { createBrowserRouter } from "react-router-dom";

import { lazyImportPage, lazyLoad } from "@utils/lazyLoad";
import App from "@/App.tsx";

import RouteGuard from "./RouteGuard";

const Home = lazyImportPage("Home");
const About = lazyImportPage("About");
const Login = lazyImportPage("Login");
const Registration = lazyImportPage("Registration");
const Dashboard = lazyImportPage("Dashboard");
const Projects = lazyImportPage("Projects");
const Gratitude = lazyImportPage("Gratitude");
const Admin = lazyImportPage("Admin");
const Profile = lazyImportPage("Profile");
const ErrorPage = lazyImportPage("Error");

const router = createBrowserRouter([
    {
        // The static elements/components that will always be rendered.
        element: <App />,
        children: [
            { path: "/", element: lazyLoad(Home) },
            { path: "/about", element: lazyLoad(About) },
            {
                // GuestOnly
                path: "/login",
                element: <RouteGuard role="guest">{lazyLoad(Login)}</RouteGuard>,
            },
            {
                // GuestOnly
                path: "/registration",
                element: <RouteGuard role="guest">{lazyLoad(Registration)}</RouteGuard>,
            },
            {
                // Allowed for logged in users
                path: "/dashboard",
                element: <RouteGuard role="authenticated">{lazyLoad(Dashboard)}</RouteGuard>,
                children: [
                    {
                        path: "projects",
                        element: <RouteGuard role="authenticated">{lazyLoad(Projects)}</RouteGuard>,
                    },
                    {
                        path: "gratitude",
                        element: (
                            <RouteGuard role="authenticated">{lazyLoad(Gratitude)}</RouteGuard>
                        ),
                    },
                ],
            },
            {
                // Allowed for admin
                path: "/admin",
                element: <RouteGuard role="admin">{lazyLoad(Admin)}</RouteGuard>,
            },
            {
                // Allowed for logged in users
                path: "/profile",
                element: <RouteGuard role="authenticated">{lazyLoad(Profile)}</RouteGuard>,
            },
            { path: "*", element: lazyLoad(ErrorPage) },
        ],
    },
]);

export default router;
