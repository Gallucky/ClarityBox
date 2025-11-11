import { useNavigate } from "react-router-dom";
import useAuth from "@/app/providers/Auth/useAuth";
import { Button } from "@/components/ui/shadcn/button";

// Todo: Home page changes when the user is logged in.
const Home = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5">
                <Button
                    type="button"
                    onClick={() => void navigate("/login")}
                    className="hover:opacity-75 p-2!">
                    Login
                </Button>
                <Button
                    type="button"
                    onClick={() => void navigate("/registration")}
                    className="hover:opacity-75 p-2!">
                    Registration
                </Button>
                <Button
                    type="button"
                    onClick={() => void navigate("/about")}
                    className="hover:opacity-75 p-2!">
                    About
                </Button>
                <Button
                    type="button"
                    onClick={() => void navigate("/")}
                    className="hover:opacity-75 p-2!">
                    Home
                </Button>

                <Button type="button" onClick={() => logout()} className="hover:opacity-75 p-2!">
                    Logout
                </Button>
            </div>
        </>
    );
};

export default Home;
