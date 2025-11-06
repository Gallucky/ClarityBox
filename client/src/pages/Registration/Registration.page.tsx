import GlassCard from "@/components/form/GlassCard";
import DarkVeil from "@/components/layout/DarkVeil";
import { Button } from "@/components/ui/shadcn/button";
import { Field, FieldError, FieldTitle } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";

const Registration = () => {
    const fieldClasses = "gap-1";

    return (
        <>
            <div className="h-dvh w-dvw relative">
                <DarkVeil />
                <GlassCard
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2
                        -translate-y-1/2 h-7/12! lg:h-10/12! w-[90%]!`}>
                    <form className="size-full outline flex flex-col">
                        <h2 className="page-title text-outline app-primary-fg">
                            Registration Page
                        </h2>
                        <div className="registration-form-content overflow-y-auto! h-96">
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                            <Field className={fieldClasses}>
                                <FieldTitle>Test</FieldTitle>
                                <Input type="text" placeholder="Test" />
                                <FieldError />
                            </Field>
                        </div>
                        <Button type="submit" className="w-1/2 self-center mt-5!">
                            Submit
                        </Button>
                    </form>
                </GlassCard>
            </div>
        </>
    );
};

export default Registration;
