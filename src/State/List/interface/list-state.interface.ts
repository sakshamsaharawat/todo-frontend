import { ListItem } from "./get-list.interface";

export type InitialState = {
    lists: ListItem[];
    isLoading: boolean;
    error: string | null;
}