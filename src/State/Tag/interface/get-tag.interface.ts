export interface TagItem {
    _id: string;
    user_id: string;
    title: string;
    color_code: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface TagResponse {
    data: TagItem[];
}