import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "@app/providers/Theme/useTheme";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";

// Components, elements, designs etc that are shared/needed across all pages.
const App = () => {
    const { themeValue } = useTheme();

    return (
        <div className="relative flex min-h-dvh w-full flex-col">
            <header>
                <Navbar />
            </header>
            <main className="">
                <Outlet />
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
            <Footer />
        </div>
    );
};

export default App;
