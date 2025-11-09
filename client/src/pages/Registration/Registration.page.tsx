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

const Registration = () => {
    const fieldClasses = "gap-1";
    const inputClasses = "ps-1!";

    return (
        <>
            <div className="h-dvh w-dvw relative">
                <DarkVeil />
                <GlassCard
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2
                        -translate-y-1/2 h-7/12! md:h-[71%]! lg:h-10/12! w-[90%]!`}>
                    <form className="size-full flex flex-col justify-between">
                        <h2 className="page-title text-outline app-primary-fg">
                            Registration Page
                        </h2>
                        <div className="registration-form-content">
                            <FieldTitle className="text-teal-500">Name</FieldTitle>
                            <FieldGroup className="flex flex-col md:flex-row gap-2 p-2!">
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-name-first">First</FieldLabel>
                                    <Input
                                        id="registration-name-first"
                                        type="text"
                                        placeholder="First Name"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-name-middle">
                                        Middle
                                    </FieldLabel>
                                    <Input
                                        id="registration-name-middle"
                                        type="text"
                                        placeholder="Middle Name"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-name-last">Last</FieldLabel>
                                    <Input
                                        id="registration-name-last"
                                        type="text"
                                        placeholder="Last Name"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                            </FieldGroup>

                            <FieldSeparator />

                            <FieldTitle className="text-teal-500">General Info</FieldTitle>
                            <FieldGroup className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 p-2! gap-2">
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-nickname">
                                        Nickname
                                    </FieldLabel>
                                    <Input
                                        id="registration-nickname"
                                        type="text"
                                        placeholder="Nickname"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-email">Email</FieldLabel>
                                    <Input
                                        id="registration-email"
                                        type="email"
                                        placeholder="Email"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="registration-password"
                                        type="password"
                                        placeholder="Password"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="registration-confirm-password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                            </FieldGroup>

                            <FieldSeparator />

                            <FieldTitle className="text-teal-500">Profile Picture</FieldTitle>
                            <FieldGroup className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 p-2! gap-2">
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-profile-picture-url">
                                        Url
                                    </FieldLabel>
                                    <Input
                                        id="registration-profile-picture-url"
                                        type="url"
                                        placeholder="Picture Url"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                                <Field className={fieldClasses}>
                                    <FieldLabel htmlFor="registration-profile-picture-alt">
                                        Alt
                                    </FieldLabel>
                                    <Input
                                        id="registration-profile-picture-alt"
                                        type="text"
                                        placeholder="Picture Alt Text"
                                        className={inputClasses}
                                    />
                                    <FieldError />
                                </Field>
                            </FieldGroup>
                        </div>
                        <Button type="submit" className="w-1/2 self-center flex-none mt-2">
                            Submit
                        </Button>
                    </form>
                </GlassCard>
            </div>
        </>
    );
};

export default Registration;
