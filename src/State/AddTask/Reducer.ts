import { ListType } from './../../types/types-todo';
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TODAY_PENDING_TASK_SUCCESS, GET_TODAY_TASK_SUCCESS, GET_TOMORROW_TASK_SUCCESS, GET_WEEK_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionTypes";
import { TaskInitialState } from "./interface/task-state.interface";

const initialState: TaskInitialState = {
    task: null,
    today_tasks: [],
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
                today_tasks: [],
                isLoading: true,
                error: null
            }
        case CREATE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                task: state.task,
                isLoading: true,
                error: null
            }
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_TODAY_TASK_SUCCESS:
            return {
                ...state,
                today_tasks: action.payload,
                isLoading: false,
                error: null
            }

        case GET_TODAY_PENDING_TASK_SUCCESS:
            return {
                ...state,
                today_tasks: action.payload,
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
                today_tasks: [...state.today_tasks, action.payload],
                isLoading: false,
                error: null
            }
        case UPDATE_TASK_SUCCESS:
            if (action.listType === "Today") {
                return {
                    ...state,
                    today_tasks: state.today_tasks.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    this_week_task: state.this_week_task.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    isLoading: false,
                    error: null
                }
            }
            if (action.listType === "Tomorrow") {
                console.log("action-------Tomorrow", action)
                return {
                    ...state,
                    tomorrow_task: state.tomorrow_task.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    this_week_task: state.this_week_task.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    isLoading: false,
                    error: null
                }
            }
            if (action.listType === "Week") {
                return {
                    ...state,
                    this_week_task: state.this_week_task.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    tomorrow_task: state.tomorrow_task.map(item => {
                        if (item._id == action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                    isLoading: false,
                    error: null
                }
            }
            return state;
        case DELETE_TASK_SUCCESS:
            if (action.listType === "Today") {
                return {
                    ...state,
                    today_tasks: state.today_tasks.filter(item => item._id !== action.payload.id),
                    this_week_task: state.this_week_task.filter(item => item._id !== action.payload.id),
                    isLoading: false,
                    error: null
                }
            }
            if (action.listType === "Tomorrow") {
                return {
                    ...state,
                    tomorrow_task: state.tomorrow_task.filter(item => item._id !== action.payload.id),
                    this_week_task: state.this_week_task.filter(item => item._id !== action.payload.id),
                    isLoading: false,
                    error: null
                }
            }
            if(action.listType === "Week"){
                return {
                    ...state,
                    this_week_task: state.this_week_task.filter(item => item._id !== action.payload.id),
                    tomorrow_task: state.tomorrow_task.filter(item => item._id !== action.payload.id),
                    today_tasks: state.today_tasks.filter(item => item._id !== action.payload.id),
                    isLoading: false,
                    error: null
                }
            }
            return state;
        case GET_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                today_tasks: [],
                isLoading: false
            }
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                today_tasks: state.today_tasks,
                isLoading: false
            }
        case UPDATE_TASK_FAILURE:
            return {
                ...state,
                task: state.task,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}