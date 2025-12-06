import type { User } from "@/types/models/User";

export type LoginResponse = {
    token: string;
    user: User;
};
