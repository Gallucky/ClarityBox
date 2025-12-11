import { joiResolver } from "@hookform/resolvers/joi";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@radix-ui/react-dialog";
import postCreationSchema from "@schemas/postCreationSchema";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { PostFormData } from "@/types/forms/post/PostFormData";
import GlassCard from "@components/form/GlassCard";
import { DialogFooter, DialogHeader } from "@components/ui/shadcn/dialog";
import { Textarea } from "@components/ui/shadcn/textarea";
import Switch from "@components/ui/Switch";

type CreateBoxDialogProps = {
    handleCreateBox: (data: PostFormData) => Promise<void>;
};

const CreateBoxDialog = (props: CreateBoxDialogProps) => {
    const { handleCreateBox } = props;

    const form = useForm<PostFormData>({
        defaultValues: {
            content: "",
            isPublic: false,
        },
        mode: "onChange",
        resolver: joiResolver(postCreationSchema),
    });

    const onSubmit = async (data: PostFormData) => {
        try {
            await handleCreateBox(data);
            toast.success("Post created successfully!");
            form.reset();
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message ?? "Something went wrong!");
        }
    };

    return (
        <Dialog>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogTrigger className="bg-secondary scale-down disabled:bg-secondary/50 absolute right-30 bottom-20 z-50 flex size-20 items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:blur-[1px]">
                    <Plus size={50} />
                </DialogTrigger>
                <DialogContent className="max-h-[90dvh] overflow-y-auto p-0">
                    <GlassCard
                        centered
                        lightSource={false}
                        className="z-99 justify-center! gap-10 max-sm:w-[85dvw]!"
                    >
                        <DialogHeader className="overflow-clip! px-4 text-center!">
                            <DialogTitle className="font-semibold">
                                Create a gratitude box
                            </DialogTitle>
                            <DialogDescription>
                                Put things that you are grateful for in the box.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full flex-col lg:w-2/3">
                            <Textarea
                                className={`max-h-[250px] min-h-[100px] rounded indent-1 ${
                                    form.formState.errors.content
                                        ? "border-red-500"
                                        : ""
                                }`}
                                {...form.register("content")}
                            />
                            {form.formState.errors.content && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.content.message}*
                                </p>
                            )}
                        </div>
                        <Controller
                            name="isPublic"
                            control={form.control}
                            render={({ field }) => (
                                <div className="flex flex-col overflow-clip!">
                                    <Switch
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="bg-card/20 rounded"
                                    >
                                        Make this box public?
                                    </Switch>
                                    {form.formState.errors.isPublic && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                form.formState.errors.isPublic
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                        <DialogFooter className="flex h-96 max-h-[50px] flex-row items-center justify-center max-sm:w-full">
                            <DialogClose
                                className="bg-muted hover:bg-muted/75 size-1/2 rounded-full sm:size-fit sm:min-w-[150px] sm:px-4! sm:py-0.5!"
                                type="submit"
                                onClick={() => form.reset()}
                            >
                                Cancel
                            </DialogClose>
                            <button
                                className="bg-accent disabled:bg-accent/50 disabled:text-background/60 hover:bg-accent/75 size-1/2 rounded-full disabled:hover:cursor-not-allowed sm:size-fit sm:min-w-[150px] sm:px-4! sm:py-0.5!"
                                type="submit"
                                disabled={!form.formState.isValid}
                            >
                                Submit
                            </button>
                        </DialogFooter>
                    </GlassCard>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateBoxDialog;
