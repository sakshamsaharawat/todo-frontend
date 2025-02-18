import { ListItem } from "../../List/interface/get-list.interface";
import { TagItem } from "../../Tag/interface/get-tag.interface";

export interface TaskItem {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    due_date: string;
    tag_ids: string[];
    list_id: string;
    isDeleted: string;
    createdAt: string;
    updatedAt: string;
    tags: TagItem[];
    list: ListItem;
}
export interface TaskResponse {
    success: boolean;
    message: string;
    data: TaskItem[];
}