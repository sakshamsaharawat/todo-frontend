import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TODAY_PENDING_TASK_SUCCESS, GET_TODAY_TASK_SUCCESS, GET_TOMORROW_TASK_SUCCESS, GET_WEEK_TASK_SUCCESS } from "./ActionTypes";
import { TaskInitialState } from "./interface/task-state.interface";

const initialState: TaskInitialState = {
    toady_tasks: [],
    tomorrow_task: [],
    this_week_task: [],
    isLoading: false,
    error: null
}

export const taskReducer = (state: TaskInitialState = initialState, action: any): TaskInitialState => {
    switch (action.type) {
        case GET_TASK_REQUEST:
            return {
                ...state,
                toady_tasks: [],
                isLoading: true,
                error: null
            }
        case CREATE_TASK_REQUEST:
            return {
                ...state,
                toady_tasks: state.toady_tasks,
                isLoading: true,
                error: null,
            }
        case GET_TODAY_TASK_SUCCESS:
            return {
                ...state,
                toady_tasks: action.payload,
                isLoading: false,
                error: null
            }

        case GET_TODAY_PENDING_TASK_SUCCESS:
            return {
                ...state,
                toady_tasks: action.payload,
                isLoading: false,
                error: null
            }
        case GET_TOMORROW_TASK_SUCCESS:
            return {
                ...state,
                tomorrow_task: action.payload,
                isLoading: false,
                error: null
            }
            case GET_WEEK_TASK_SUCCESS:
                return {
                    ...state,
                    this_week_task: action.payload,
                    isLoading: false,
                    error: null
                }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                toady_tasks: [...state.toady_tasks, action.payload],
                isLoading: false,
                error: null
            }
        case GET_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                toady_tasks: [],
                isLoading: false
            }
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                toady_tasks: state.toady_tasks,
                isLoading: false
            }

        default:
            return state;
    }
}