import type { User } from "./models/User";

export type LoginResponse = {
    token: string;
    user: User;
};
