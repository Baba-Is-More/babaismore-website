import {
    createTRPCClient,
    httpBatchLink,
    httpLink,
    isNonJsonSerializable,
    isTRPCClientError,
    splitLink,
} from "@trpc/client";
import type { AppRouter } from "../server/appRouter";

function fetchWithCredentials(url: string | URL, options?: RequestInit) {
    return fetch(url, { ...options, credentials: "include" });
}

export const trpc = createTRPCClient<AppRouter>({
    links: [
        splitLink({
            condition: (op) => isNonJsonSerializable(op.input),
            true: httpLink({
                url: "/trpc",
                fetch: fetchWithCredentials,
            }),
            false: httpBatchLink({
                url: "/trpc",
                fetch: fetchWithCredentials,
            }),
        }),
    ],
});

// use this instead of isTRPCCientError so you dont import AppRouter on everything!
export function isTRPCError(error: unknown) {
    return isTRPCClientError<AppRouter>(error);
}
