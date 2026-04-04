export {};

declare global {
    namespace Express {
        interface User {
            // the ID of the currently logged in user
            id: string;
        }
    }
}
