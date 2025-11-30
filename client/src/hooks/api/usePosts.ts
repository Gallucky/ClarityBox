import { useState } from "react";
import useQuery from "@app/providers/Query/useQuery";
import { PostRequestError } from "@errors/RequestErrors";
import type { PostFormData } from "@/types/forms/post/PostFormData";
import type { Post } from "@/types/models/Post";

const usePosts = () => {
    const api = useQuery();

    // States
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handlePostError = (error: any, method: string) => {
        const errorAsError = error as Error;
        const err = new PostRequestError(
            method,
            errorAsError.message,
            errorAsError,
        );
        setError(err);
        throw err;
    };

    //region | ====== Get ====== |

    const getPostById = async (postId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get(`/posts/${postId}`);

            setPosts([response]);

            return response;
        } catch (error) {
            handlePostError(error, "getPostById");
        } finally {
            setLoading(false);
        }
    };

    const getAllPublicPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Post[] = await api.get("/posts/public");

            setPosts(response);

            return response;
        } catch (error) {
            handlePostError(error, "getAllPublicPosts");
        } finally {
            setLoading(false);
        }
    };

    const getAllPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Post[] = await api.get("/posts/");

            setPosts(response);

            return response;
        } catch (error) {
            handlePostError(error, "getAllPosts");
        } finally {
            setLoading(false);
        }
    };

    const getMyPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Post[] = await api.get("/posts/my-posts");
            setPosts(response);

            return response;
        } catch (error) {
            handlePostError(error, "getMyPosts");
        } finally {
            setLoading(false);
        }
    };

    const getPostsByUserId = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Post[] = await api.get(`/posts/user/${userId}`);

            setPosts(response);

            return response;
        } catch (error) {
            handlePostError(error, "getPostsByUserId");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Get ====== |

    //region | ====== Post ====== |

    const createPost = async (post: PostFormData) => {
        try {
            setLoading(true);
            setError(null);
            const response: Post = await api.post("/posts/", post);

            if (!response) {
                throw new PostRequestError(
                    "createPost",
                    "Post creation failed.",
                );
            }

            return response;
        } catch (error) {
            handlePostError(error, "createPost");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Post ====== |

    //region | ====== Put ====== |

    const updatePost = async (postId: string, post: PostFormData) => {
        try {
            setLoading(true);
            setError(null);
            const response: Post = await api.put(`/posts/${postId}`, post);

            if (!response) {
                throw new PostRequestError("updatePost", "Post update failed.");
            }

            return response;
        } catch (error) {
            handlePostError(error, "updatePost");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Put ====== |

    //region | ====== Patch ====== |

    // Todo: Add Non-MVP patch methods.
    const likeUnlikePostToggle = async (postId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response: Post = await api.patch(`/posts/${postId}`);
            return response;
        } catch (error) {
            handlePostError(error, "likeUnlikePostToggle");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Patch ====== |

    //region | ====== Delete ====== |

    const deletePost = async (postId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response: Post = await api.delete(`/posts/${postId}`);

            if (!response) {
                throw new PostRequestError("deletePost", "An error occurred.");
            }

            return response;
        } catch (error) {
            handlePostError(error, "deletePost");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Delete ====== |

    return {
        posts,
        loading,
        error,
        getPostById,
        getAllPublicPosts,
        getAllPosts,
        getMyPosts,
        getPostsByUserId,
        createPost,
        updatePost,
        likeUnlikePostToggle,
        deletePost,
    };
};

export default usePosts;
