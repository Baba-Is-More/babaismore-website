import { createTRPCClient, httpBatchLink, isTRPCClientError } from "@trpc/client";
import type { AppRouter } from "../server/appRouter";

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "/trpc",
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: "include",
                });
            },
        }),
    ],
});

// use this instead of isTRPCCientError so you dont import AppRouter on everything!
export function isTRPCError(error: unknown) {
    return isTRPCClientError<AppRouter>(error)
}
