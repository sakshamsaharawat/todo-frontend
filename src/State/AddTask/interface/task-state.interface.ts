import { TaskItem } from "./get-task.interface";

export interface TaskInitialState {
    task: TaskItem | null;
    today_tasks: TaskItem[];
    tomorrow_task: TaskItem[];
    this_week_task: TaskItem[];
    isLoading: boolean;
    error: string | null;
} 