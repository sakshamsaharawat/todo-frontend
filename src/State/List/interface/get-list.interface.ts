interface ListItem {
    _id: string;
    user_id: string;
    title: string;
    color_code: string;
}
export interface ListResponse {
    data: ListItem[];
}