export type AuthPromise = Promise<Auth>;
export type Auth = { ok: true; error?: undefined } | { ok: false; error: Error };
