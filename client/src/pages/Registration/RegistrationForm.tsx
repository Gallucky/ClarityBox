import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "@/app/providers/Auth/useAuth";
import type { RegisterFormData } from "@/types/forms/user/RegisterFormData";
import { Button } from "@components/ui/shadcn/button";
import type { UseFormHandleSubmit } from "react-hook-form";

type RegistrationFormProps = {
    children: ReactNode;
    handleSubmit: UseFormHandleSubmit<RegisterFormData, RegisterFormData>;
    isValid: boolean;
};

const RegistrationForm = (props: RegistrationFormProps) => {
    const { handleSubmit, isValid } = props;

    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormData) => {
        const { ok, error } = await auth.register(data);

        if (!ok) {
            const errorMessage = error.message ?? "Something went wrong!";
            toast.error(`Registration failed!\n${error.name}: ${errorMessage}`);
        } else {
            toast.success(
                "Account created successfully! Redirecting to login page.",
            );
            navigate("/login");
        }
    };

    return (
        <form
            id="registration-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="page-title text-outline app-primary-fg">
                Registration Page
            </h2>
            {props.children}
            <Button
                disabled={!isValid}
                type="submit"
                className="mt-4! w-1/2 flex-none self-center select-none"
            >
                Submit
            </Button>
        </form>
        // <div>
        //     <Button
        //         onClick={() =>
        //             onSubmit({
        //                 name: {
        //                     first: "John",
        //                     middle: "",
        //                     last: "Doe",
        //                 },
        //                 email: "email@gmail.com",
        //                 password: "password",
        //                 confirmPassword: "password",
        //                 nickname: "nickname",
        //                 profileImage: {
        //                     url: "",
        //                     alt: "",
        //                 },
        //             })
        //         }>
        //         Manual Submit
        //     </Button>
        // </div>
    );
};
export default RegistrationForm;
