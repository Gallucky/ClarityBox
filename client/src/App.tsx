import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "@app/providers/Theme/useTheme";

// Components, elements, designs etc that are shared/needed across all pages.
const App = () => {
    const { themeValue } = useTheme();

    return (
        <>
            {/* Todo: Navbar */}
            <main>
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
            {/* Todo: Footer */}
        </>
    );
};

export default App;
