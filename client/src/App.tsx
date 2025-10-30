import { Outlet } from "react-router-dom";

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
