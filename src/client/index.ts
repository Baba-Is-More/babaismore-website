import { createTRPCClient, httpBatchLink } from "@trpc/client";
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
