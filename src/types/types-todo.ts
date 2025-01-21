export type ListType = {
    title: string;
    color_code: string;
};

export type ListSubtasks = {
    task: number;
    task_title: string;
};

export type Tag = {
    tag_title: string;
    color_code: string;
};

export interface TodoItem {
    title: string;
    description: string;
    date?: string;
    list_subtasks?: ListSubtasks;
    list_type?: ListType;
    tag?: Tag[];
}
