import { Outlet } from "react-router-dom";

// Components, elements, designs etc that are shared/needed across all pages.
const App = () => {
    return (
        <>
            {/* Todo: Navbar */}
            <main>
                <Outlet />
            </main>
            {/* Todo: Footer */}
        </>
    );
};

export default App;
