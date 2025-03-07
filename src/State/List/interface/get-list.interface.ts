export interface ListItem {
    _id: string;
    user_id: string;
    title: string;
    color_code: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ListCount {
    _id: string;
    count: number
}
export interface ListResponse {
    data: ListItem[];
}