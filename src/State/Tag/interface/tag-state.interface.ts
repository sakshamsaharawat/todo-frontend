import { TagItem } from "./get-tag.interface";

export type InitialState = {
    tags: TagItem[];
    isLoading: boolean;
    error: string | null;
};