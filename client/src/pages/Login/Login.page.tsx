import GlassCard from "@/components/form/GlassCard";
import DarkVeil from "@/components/layout/DarkVeil";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";

const Login = () => {
    return (
        <>
            <div className="h-dvh w-dvw relative overflow-hidden">
                <DarkVeil />
                <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7/12! w-[90%]!">
                    <form className="flex flex-col items-center justify-center">
                        <h1 className="font-[Inter] font-semibold app-primary-fg text-outline">
                            Login Page
                        </h1>
                        <div className="flex flex-col items-center gap-5 mt-10!">
                            <Input type="email" placeholder="Email" className="p-2! m-2!" />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="p-2! mb-5! m-2!"
                            />
                            <Button type="button" className="w-3/4 rounded-xl app-primary-bg">
                                Login
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </>
    );
};

export default Login;
