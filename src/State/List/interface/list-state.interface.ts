import { ListCount, ListItem } from "./get-list.interface";

export type InitialState = {
    lists: ListItem[] | ListCount[];
    isLoading: boolean;
    error: string | null;
}