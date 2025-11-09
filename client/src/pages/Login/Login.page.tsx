import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";
import useAuth from "@/app/providers/Auth/useAuth";
import { useTheme } from "@/app/providers/Theme/useTheme";
import GlassCard from "@/components/form/GlassCard";
import DarkVeil from "@/components/layout/DarkVeil";
import { Button } from "@/components/ui/shadcn/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import loginSchema from "@/schemas/loginSchema";
import type { LoginFormData } from "@/types/forms/LoginFormData";

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

    const onSubmit = async (data: LoginFormData) => {
        try {
            await auth.login(data);

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
        } catch (error) {
            const err = error as Error;
            const errorMessage = err.message ?? "Something went wrong!";

            toast.error(`Login failed!\n${err.name}: ${errorMessage}`, {
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
        }
    };

    return (
        <>
            <div className="h-dvh w-dvw relative overflow-hidden">
                <DarkVeil />
                <GlassCard centered className="h-7/12! w-[90%]!">
                    <form
                        id="login-form"
                        noValidate
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col items-center justify-center w-full">
                        <h1 className="font-[Inter] font-semibold app-primary-fg text-outline">
                            Login Page
                        </h1>
                        <FieldGroup className="flex flex-col items-center mt-10! md:w-7/12 max-sm:gap-10">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
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
                                        <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Password"
                                            className="p-2!"
                                        />
                                        {fieldState.invalid && (
                                            <p className="text-fluid-0.625!">
                                                {fieldState.error?.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />

                            <Button
                                disabled={!form.formState.isValid}
                                className="w-3/4 rounded-xl app-primary-bg select-none hover:opacity-85 hover:brightness-90 transition-all! ease-in-out! duration-200! mt-5!">
                                Login
                            </Button>
                        </FieldGroup>
                    </form>
                </GlassCard>
            </div>
        </>
    );
};

export default Login;
