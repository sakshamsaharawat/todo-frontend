import { TaskData } from "./create-task.interface";

export interface TaskInitialState {
    tasks: TaskData[]
    isLoading: boolean
    error: string | null

} 