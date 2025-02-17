import { TaskItem } from "../../AddTask/interface/get-task.interface";

export interface calendarTaskResponse {
    success: boolean;
    message: string;
    data: TaskItem[];
}