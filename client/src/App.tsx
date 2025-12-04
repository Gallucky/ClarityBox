import { SpeedInsights } from "@vercel/speed-insights/next";
import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "@app/providers/Theme/useTheme";

// Components, elements, designs etc that are shared/needed across all pages.
const App = () => {
    const { themeValue } = useTheme();

    return (
        <div className="relative flex min-h-dvh w-full flex-col">
            <header>{/* <Navbar /> */}</header>
            <main className="">
                <SpeedInsights />
                {/* <Outlet /> */}
                <p className="absolute-center">
                    Testing only the App component to see if it works and where
                    to check
                </p>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={themeValue ?? "light"}
                    transition={Slide}
                />
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default App;
