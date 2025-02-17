import { UserData } from "./user-interface";

    export type UserInitialState = {
        user: UserData | null;
        jwt: string | null;
        isLoading: boolean;
        error: string | null;
    };