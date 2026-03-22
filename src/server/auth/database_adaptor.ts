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
            return null;
        },
        getUserByEmail: async function (
            email: string,
        ): Promise<AdapterUser | null> {
            return null;
        },
        getUserByAccount: async function (
            providerAccountId: Pick<
                AdapterAccount,
                "provider" | "providerAccountId"
            >,
        ): Promise<AdapterUser | null> {
            return null;
        },
        updateUser: async function (
            user: Partial<AdapterUser> & Pick<AdapterUser, "id">,
        ): Promise<AdapterUser> {
            throw "todo";
        },
        linkAccount: async function (
            account: AdapterAccount,
        ): Promise<AdapterAccount | null> {
            return null;
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
            return null;
        },
        updateSession: async function (
            session: Partial<AdapterSession> &
                Pick<AdapterSession, "sessionToken">,
        ): Promise<AdapterSession | null> {
            return null;
        },
        deleteSession: async function (sessionToken: string) {},
    };
}
