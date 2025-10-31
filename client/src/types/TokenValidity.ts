export type TokenValidity = {
    result: boolean;
    status?: "expired" | "invalid" | "missing";
};
