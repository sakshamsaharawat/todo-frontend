import { TaskItem } from "../../AddTask/interface/get-task.interface";

export interface CalendarInitialState {
    tasks: TaskItem[];
    isLoading: boolean;
    error: null;
}