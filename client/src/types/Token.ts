/**
 * The authentication token for a user.
 */
export type Token = {
    /**
     * @field The user id.
     */
    _id: string;
    /**
     * @field Is the user has admin privileges / is an admin user.
     */
    isAdmin: boolean;
    /**
     * @field Issued at / Created At
     */
    iat: number;
    /**
     * @field Expires at
     */
    exp: number;
};
