import {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
} from "@auth/core/adapters";

export const a = "";
export function DBAdapter(): Adapter {
    return {
        createUser: async function (user: AdapterUser): Promise<AdapterUser> {
            throw "todo";
        },
        getUser: async function (id: string): Promise<AdapterUser | null> {
            throw "todo";
        },
        getUserByEmail: async function (
            email: string,
        ): Promise<AdapterUser | null> {
            throw "todo";
        },
        getUserByAccount: async function (
            providerAccountId: Pick<
                AdapterAccount,
                "provider" | "providerAccountId"
            >,
        ): Promise<AdapterUser | null> {
            throw "todo";
        },
        updateUser: async function (
            user: Partial<AdapterUser> & Pick<AdapterUser, "id">,
        ): Promise<AdapterUser> {
            throw "todo";
        },
        linkAccount: async function (
            account: AdapterAccount,
        ): Promise<AdapterAccount | null> {
            throw "todo";
        },
        createSession: async function (session: {
            sessionToken: string;
            userId: string;
            expires: Date;
        }): Promise<AdapterSession> {
            throw "todo";
        },
        getSessionAndUser: async function (sessionToken: string): Promise<{
            session: AdapterSession;
            user: AdapterUser;
        } | null> {
            throw "todo";
        },
        updateSession: async function (
            session: Partial<AdapterSession> &
                Pick<AdapterSession, "sessionToken">,
        ): Promise<AdapterSession | null> {
            throw "todo";
        },
        deleteSession: async function (sessionToken: string) {},
    };
}
