import { TagItem } from "../../../State/Tag/interface/get-tag.interface";

export interface CreateTask {
    title: string;
    description: string;
    due_date: string;
    tag_ids: string[];
    list_id?: string ;
    tags: TagItem[];
}