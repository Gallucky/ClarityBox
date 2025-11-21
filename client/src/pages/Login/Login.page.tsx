import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import useAuth from "@/app/providers/Auth/useAuth";
import { useTheme } from "@/app/providers/Theme/useTheme";
import GlassCard from "@/components/form/GlassCard";
import DarkVeil from "@/components/layout/DarkVeil";
import { Button } from "@/components/ui/shadcn/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import loginSchema from "@/schemas/loginSchema";
import type { LoginFormData } from "@/types/forms/user/LoginFormData";

const Login = () => {
    const form = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        resolver: joiResolver(loginSchema),
    });

    const auth = useAuth();
    const { themeValue } = useTheme();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        const { ok, error } = await auth.login(data);

        if (!ok) {
            const errorMessage = error.message ?? "Something went wrong!";

            toast.error(
                `Login failed!\n${error.name}: 
            ${errorMessage}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: themeValue,
                    transition: Slide,
                },
            );

            return;
        }

        toast.success("Successfully logged in!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: themeValue,
            transition: Slide,
        });

        navigate("/home");
    };

    return (
        <>
            <div className="relative h-dvh w-dvw overflow-hidden">
                <DarkVeil />
                <GlassCard centered className="h-7/12! w-[90%]!">
                    <form
                        id="login-form"
                        noValidate
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        <h1 className="app-primary-fg text-outline overflow-clip font-[Inter] font-semibold">
                            Login Page
                        </h1>
                        <FieldGroup className="mt-10! flex flex-col items-center max-sm:gap-10 md:w-7/12">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="overflow-clip"
                                        >
                                            Email:
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Email"
                                            className="p-2!"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                                className="-mt-2!"
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="overflow-clip"
                                        >
                                            Password:
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Password"
                                            className="p-2!"
                                        />
                                        {fieldState.invalid && (
                                            <p className="text-fluid-0.625! overflow-clip">
                                                {fieldState.error?.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />

                            <Button
                                disabled={!form.formState.isValid}
                                className="app-primary-bg mt-5! w-3/4 rounded-xl transition-all! duration-200! ease-in-out! select-none hover:opacity-85 hover:brightness-90"
                            >
                                Login
                            </Button>
                        </FieldGroup>
                        <p className="text-fluid-0.75! mt-2!">
                            Don't have an account yet?{" "}
                            <span
                                className="text-fluid-0.75! text-primary cursor-pointer hover:underline"
                                onClick={() => navigate("/registration")}
                            >
                                Register
                            </span>
                        </p>
                    </form>
                </GlassCard>
            </div>
        </>
    );
};

export default Login;
