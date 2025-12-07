<<<<<<< HEAD
import type { User } from "./models/User";
=======
import type { User } from "@/types/models/User";
>>>>>>> eb4bbf67a3cc39e4af48a66c146f7a777a30bb37

export type LoginResponse = {
    token: string;
    user: User;
};
