// router.tsx is like a traffic controller.

import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";

// Todo: Import the app layout.
// # containing all the static elements/components that will always be rendered.
// # e.g. navigation bar, footer, etc.

// Todo: Import the RouteGuard.
// # to protect routes from unauthorized access.

// Todo: Lazy Import the pages.
// # e.g. Home, About, Login, Registration, etc.
const Home = null;
const About = null;
const Login = null;
const Registration = null;
const Dashboard = null;
const Projects = null;
const Gratitude = null;
const Stats = null;
const Admin = null;
const Profile = null;
const ErrorPage = null;

const router = createBrowserRouter([
    {
        // The static elements/components that will always be rendered.
        element: <App />,
        children: [
            { path: "/", element: Home },
            { path: "/about", element: About },
            {
                // GuestOnly
                path: "/login",
                element: Login,
            },
            {
                // GuestOnly
                path: "/register",
                element: Registration,
            },
            {
                // Allowed for logged in users
                path: "/dashboard",
                element: Dashboard,
                children: [
                    { path: "projects", element: Projects },
                    { path: "gratitude", element: Gratitude },
                    { path: "stats", element: Stats },
                ],
            },
            {
                // Allowed for admin
                path: "/admin",
                element: Admin,
            },
            {
                // Allowed for logged in users
                path: "/profile",
                element: Profile,
            },
            { path: "*", element: ErrorPage },
        ],
    },
]);

export default router;
