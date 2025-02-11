import { TaskData } from "./create-task.interface";

export interface TaskInitialState {
    toady_tasks: TaskData[];
    tomorrow_task: TaskData[];
    this_week_task: TaskData[];
    isLoading: boolean;
    error: string | null;
} 