export interface UpdateTask {
    title: string;
    description: string;
    due_date: string;
    tag_ids: string[];
    list_id: string;
}

export interface UpdateTaskPayload extends UpdateTask {
    id: string;
}