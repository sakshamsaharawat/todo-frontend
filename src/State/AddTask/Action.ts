import { Dispatch } from 'redux';
import { CREATE_LIST_SUCCESS } from "../List/Action.type";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST } from "./ActionTypes";
import { TaskData } from "./interface/create-task.interface";
import axiosInstance from '../../utils/axiosInstance';

const createTaskRequest = () => ({ type: CREATE_TASK_REQUEST })
const createTaskSuccess = (taskData: TaskData) => ({ type: CREATE_LIST_SUCCESS, payload: taskData })
const createTaskFailure = (error: string) => ({ type: CREATE_TASK_FAILURE, payload: error })

export const createTask = (taskData: TaskData) => async (dispatch: Dispatch) => {
    dispatch(createTaskRequest())
    try {
        const response = await axiosInstance.post("task/create", taskData);
        dispatch(createTaskSuccess(response.data))
    } catch (error: any) {
        console.log(error.message)
        dispatch(createTaskFailure(error.message))
    }
} 