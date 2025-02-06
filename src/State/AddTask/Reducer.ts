import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS } from "./ActionTypes";
import { TaskInitialState } from "./interface/task-state.interface";

const initialState: TaskInitialState = {
    tasks: [],
    isLoading: false,
    error: null
}

export const taskReducer = (state: TaskInitialState = initialState, action: any): TaskInitialState => {
    switch (action.type) {
        case CREATE_TASK_REQUEST:
            return {
                ...state,
                tasks: state.tasks,
                isLoading: true,
                error: null,
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                isLoading: false,
                error: null
            }
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                tasks: state.tasks,
                isLoading: false
            }

        default:
            return state;
    }
}