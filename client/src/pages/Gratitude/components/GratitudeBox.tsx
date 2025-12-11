import { Edit, Heart, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Post } from "@/types/models/Post"; // Added import
import useAuth from "@app/providers/Auth/useAuth";
import { Button } from "@components/ui/shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/shadcn/dialog";
import { Textarea } from "@components/ui/shadcn/textarea";
import ReadMore from "@components/utils/ReadMore";
import usePosts from "@hooks/api/usePosts";
import useMediaQuery from "@hooks/useMediaQuery";
import formatDateTimeLocale from "@utils/formatDateTime";

type GratitudeBoxProps = {
    _id: string;
    content: string;
    creator: {
        _id: string;
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: string[];
    isPublic: boolean;
    handleLike: (postId: string, newLikes: string[]) => void;
    onPostUpdated: (updatedPost: Post) => void; // Added
    onPostDeleted: (postId: string) => void; // Added
    className?: string;
};

const GratitudeBox = (props: GratitudeBoxProps) => {
    const {
        _id,
        content,
        creator,
        createdAt,
        likes,
        isPublic,
        handleLike,
        onPostUpdated, // Destructure new prop
        onPostDeleted, // Destructure new prop
        className,
    } = props;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { user } = useAuth();
    const { likeUnlikePostToggle, deletePost, updatePost } = usePosts();

    const [localLikes, setLocalLikes] = useState(likes);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const textPreviewAmount = isMobile ? 100 : 150;

    const handleLikeUnlikeToggle = async () => {
        try {
            const updatedPost = await likeUnlikePostToggle(_id);
            if (!updatedPost) return;
            setLocalLikes(updatedPost.likes);
            handleLike(_id, updatedPost.likes);
        } catch (e) {
            console.error(e);
            toast.error("Failed to like/unlike post.");
        }
    };

    const handleEditClick = () => {
        setEditedContent(content);
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const payload = { content: editedContent, isPublic };
            const updatedPost = await updatePost(_id, payload);
            if (!updatedPost) return; // Get the updated post
            setIsEditDialogOpen(false);
            toast.success("Gratitude updated successfully!");
            onPostUpdated(updatedPost); // Call the callback
        } catch (error: any) {
            console.error("Failed to update post:", error);
            if (error.response?.data) {
                console.error("Server error data:", error.response.data);
                toast.error(
                    `Failed to update gratitude: ${error.response.data.message || "Unknown error"}`,
                );
            } else {
                toast.error("Failed to update gratitude.");
            }
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePost(_id);
            setIsDeleteDialogOpen(false);
            toast.success("Gratitude deleted successfully!");
            onPostDeleted(_id); // Call the callback
        } catch (error: any) {
            console.error("Failed to delete post:", error);
            if (error.response?.data) {
                console.error("Server error data:", error.response.data);
                toast.error(
                    `Failed to delete gratitude: ${error.response.data.message || "Unknown error"}`,
                );
            } else {
                toast.error("Failed to delete gratitude.");
            }
        }
    };

    const handleCancelEdit = () => {
        setIsEditDialogOpen(false);
        toast.info("Edit cancelled.");
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        toast.info("Delete cancelled.");
    };

    return (
        <>
            <div className={`gratitude-box ${className}`}>
                <p className="relative">
                    {content.substring(0, textPreviewAmount)}...{" "}
                </p>
                <ReadMore
                    href={`/gratitude-boxes/${_id}`}
                    className="read-more right-0 bottom-[5dvh]"
                />
                <div className="info">
                    <p className="created-by">
                        <img
                            src={creator.profilePicture}
                            alt={`${creator.nickname}'s profile picture`}
                            className="profile-picture"
                        />
                        <span>{creator.nickname}</span>
                    </p>
                    <p className="created-at">
                        <span>{formatDateTimeLocale(createdAt)}</span>
                    </p>
                    <div className="actions">
                        {user && (user._id === creator._id || user.isAdmin) && (
                            <button
                                className="action delete"
                                onClick={handleDeleteClick}
                            >
                                <abbr title="Delete" className="size-fit">
                                    <Trash />
                                </abbr>
                            </button>
                        )}
                        {user && user._id === creator._id && (
                            <button
                                className="action edit"
                                onClick={handleEditClick}
                            >
                                <abbr title="Edit" className="size-fit">
                                    <Edit />
                                </abbr>
                            </button>
                        )}
                    </div>
                    <p
                        className={`likes ${
                            user && localLikes.includes(user._id) ? "liked" : ""
                        }`}
                        onClick={handleLikeUnlikeToggle}
                    >
                        <span>{localLikes.length}</span>
                        <Heart />
                    </p>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Gratitude</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={5}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the gratitude post.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GratitudeBox;
