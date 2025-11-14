import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import GlassCard from "@/components/form/GlassCard";
import DarkVeil from "@/components/layout/DarkVeil";
import { Button } from "@/components/ui/shadcn/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldTitle,
} from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import registerSchema from "@/schemas/registerSchema";
import type { RegisterFormData } from "@/types/forms/RegisterFormData";
import RegistrationForm from "./RegistrationForm";
import defaultValues from "./registrationFormInitialValues";

const Registration = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<RegisterFormData>({
        defaultValues,
        mode: "onChange",
        resolver: joiResolver(registerSchema),
        shouldUnregister: false,
    });

    return (
        <>
            <div className="relative h-dvh w-dvw">
                <DarkVeil />
                <GlassCard centered className={`h-7/12! w-[90%]! md:h-fit!`}>
                    <RegistrationForm handleSubmit={handleSubmit}>
                        <div className="registration-form-content">
                            <FieldTitle className="text-teal-500">
                                Name
                            </FieldTitle>
                            <FieldGroup className="flex flex-col gap-2 p-2! md:flex-row">
                                <Field data-invalid={!!errors.name?.first}>
                                    <FieldLabel htmlFor="registration-name-first">
                                        First
                                    </FieldLabel>
                                    <Input
                                        {...register("name.first")}
                                        id="registration-name-first"
                                        type="text"
                                        placeholder="First Name"
                                        aria-invalid={!!errors.name?.first}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.name?.first]}
                                    />
                                </Field>
                                <Field data-invalid={!!errors.name?.middle}>
                                    <FieldLabel htmlFor="registration-name-middle">
                                        Middle
                                    </FieldLabel>
                                    <Input
                                        {...register("name.middle")}
                                        id="registration-name-middle"
                                        type="text"
                                        placeholder="Middle Name"
                                        aria-invalid={!!errors.name?.middle}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.name?.middle]}
                                    />
                                </Field>
                                <Field data-invalid={!!errors.name?.last}>
                                    <FieldLabel htmlFor="registration-name-last">
                                        Last
                                    </FieldLabel>
                                    <Input
                                        {...register("name.last")}
                                        id="registration-name-last"
                                        type="text"
                                        placeholder="Last Name"
                                        aria-invalid={!!errors.name?.last}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.name?.last]}
                                    />
                                </Field>
                            </FieldGroup>

                            <FieldSeparator />

                            <FieldTitle className="text-teal-500">
                                General Info
                            </FieldTitle>
                            <FieldGroup className="flex flex-col gap-2 p-2! md:grid md:grid-cols-2 md:grid-rows-2">
                                <Field data-invalid={!!errors.nickname}>
                                    <FieldLabel htmlFor="registration-nickname">
                                        Nickname
                                    </FieldLabel>
                                    <Input
                                        {...register("nickname")}
                                        id="registration-nickname"
                                        type="text"
                                        placeholder="Nickname"
                                        aria-invalid={!!errors.nickname}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.nickname]}
                                    />
                                </Field>
                                <Field data-invalid={!!errors.email}>
                                    <FieldLabel htmlFor="registration-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...register("email")}
                                        id="registration-email"
                                        type="email"
                                        placeholder="Email"
                                        aria-invalid={!!errors.email}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.email]}
                                    />
                                </Field>
                                <Field data-invalid={!!errors.password}>
                                    <FieldLabel htmlFor="registration-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...register("password")}
                                        id="registration-password"
                                        type="password"
                                        placeholder="Password"
                                        aria-invalid={!!errors.password}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.password]}
                                    />
                                </Field>
                                <Field data-invalid={!!errors.confirmPassword}>
                                    <FieldLabel htmlFor="registration-confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        {...register("confirmPassword")}
                                        id="registration-confirm-password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        aria-invalid={!!errors.confirmPassword}
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[
                                            {
                                                message:
                                                    errors.confirmPassword
                                                        ?.message,
                                            },
                                        ]}
                                    />
                                </Field>
                            </FieldGroup>

                            <FieldSeparator />

                            <FieldTitle className="text-teal-500">
                                Profile Picture
                            </FieldTitle>
                            <FieldGroup className="flex flex-col gap-2 p-2! md:grid md:grid-cols-2 md:grid-rows-1">
                                <Field
                                    data-invalid={!!errors.profileImage?.url}
                                >
                                    <FieldLabel htmlFor="registration-profile-picture-url">
                                        Url
                                    </FieldLabel>
                                    <Input
                                        {...register("profileImage.url")}
                                        id="registration-profile-picture-url"
                                        type="url"
                                        placeholder="Picture Url"
                                        aria-invalid={
                                            !!errors.profileImage?.url
                                        }
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.profileImage?.url]}
                                    />
                                </Field>
                                <Field
                                    data-invalid={!!errors.profileImage?.alt}
                                >
                                    <FieldLabel htmlFor="registration-profile-picture-alt">
                                        Alt
                                    </FieldLabel>
                                    <Input
                                        {...register("profileImage.alt")}
                                        id="registration-profile-picture-alt"
                                        type="text"
                                        placeholder="Picture Alt Text"
                                        aria-invalid={
                                            !!errors.profileImage?.alt
                                        }
                                    />
                                    <FieldError
                                        className="text-fluid-0.625! overflow-clip"
                                        errors={[errors.profileImage?.alt]}
                                    />
                                </Field>
                            </FieldGroup>
                        </div>
                        <Button
                            disabled={!isValid}
                            type="submit"
                            className="mt-4! w-1/2 flex-none self-center select-none"
                        >
                            Submit
                        </Button>
                    </RegistrationForm>
                </GlassCard>
            </div>
        </>
    );
};

export default Registration;
