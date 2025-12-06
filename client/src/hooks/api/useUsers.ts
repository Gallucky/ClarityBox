import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import type { BasicUserInfo } from "@/types/BasicUserInfo";
import type { RegisterFormData } from "@/types/forms/user/RegisterFormData";
import type { LoginPayload } from "@/types/LoginPayload";
import type { LoginResponse } from "@/types/LoginResponse";
import type { User } from "@/types/models/User";
import type { Token } from "@/types/Token";
import useQuery from "@app/providers/Query/useQuery";
import InvalidCredentialsError from "@errors/InvalidCredentialsError";
import { UserRequestError } from "@errors/RequestErrors";

const useUsers = () => {
    const api = useQuery();

    // States
    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handleUserError = (error: any, method: string) => {
        const errorAsError = error as Error;
        const err = new UserRequestError(
            method,
            errorAsError.message,
            errorAsError,
        );
        setError(err);
        return "";
    };

    //region | ====== Get ====== |

    const getUserByToken = async (userToken: string) => {
        try {
            setLoading(true);
            setError(null);

            // Decoding the token.
            const decodedToken = jwtDecode<Token>(userToken);

            // Getting the user id from the decoded token.
            const userId = decodedToken._id;

            // Fetching the user data.
            api.addHeader("x-auth-token", userToken);
            const user = await api.get(`/users/${userId}`);

            setUsers([user]);

            if (!user) {
                throw new InvalidCredentialsError(
                    "User data could not be loaded.",
                );
            }

            return user;
        } catch (error) {
            return handleUserError(error, "getUserByToken");
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: User = await api.get(`/users/${userId}`);

            setUsers([response]);

            return response;
        } catch (error) {
            handleUserError(error, "getUserById");
        } finally {
            setLoading(false);
        }
    };

    const getUserBasicInfo = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: BasicUserInfo = await api.get(
                `/users/basic-info/${userId}`,
            );

            return response;
        } catch (error) {
            handleUserError(error, "getUserBasicInfo");
        } finally {
            setLoading(false);
        }
    };

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: User[] = await api.get("/users/");

            setUsers(response);

            return response;
        } catch (error) {
            handleUserError(error, "getAllUsers");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Get ====== |

    //region | ====== Post ====== |

    //endregion | ====== Post ====== |

    const registerUser = async (user: RegisterFormData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/users/", user);

            if (!response) {
                throw new UserRequestError(
                    "registerUser",
                    "User registration failed.",
                );
            }

            return response;
        } catch (error) {
            handleUserError(error, "registerUser");
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (credentials: LoginPayload) => {
        try {
            setLoading(true);
            setError(null);

            const response: LoginResponse = await api.post(
                "/users/login",
                credentials,
            );

            if (!response) {
                throw new InvalidCredentialsError(
                    "The email or password were incorrect at this login attempt.",
                );
            }

            return response;
        } catch (error) {
            return handleUserError(error, "loginUser");
        } finally {
            setLoading(false);
        }
    };

    //region | ====== Put ====== |

    const updateUser = async (userId: string, data: RegisterFormData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.put(`/users/${userId}`, data);

            if (!response) {
                throw new UserRequestError("updateUser", "User update failed.");
            }

            return response;
        } catch (error) {
            handleUserError(error, "updateUser");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Put ====== |

    //region | ====== Patch ====== |

    // Todo: Non-MVP methods can be added later.
    // Todo: e.g., Block a user, Ban a user, change password, etc...

    //endregion | ====== Patch ====== |

    //region | ====== Delete ====== |

    const deleteUser = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.delete(`/users/${userId}`);

            if (!response) {
                throw new UserRequestError("deleteUser", "An error occurred.");
            }

            return response;
        } catch (error) {
            handleUserError(error, "deleteUser");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Delete ====== |

    return {
        users,
        loading,
        error,
        getUserByToken,
        getUserById,
        getUserBasicInfo,
        getAllUsers,
        registerUser,
        loginUser,
        updateUser,
        deleteUser,
    };
};

export default useUsers;
