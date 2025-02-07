import { Dispatch } from 'redux';
import { CREATE_LIST_SUCCESS, } from "../List/Action.type";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS } from "./ActionTypes";
import { TaskData } from "./interface/create-task.interface";
import axiosInstance from '../../utils/axiosInstance';
import { TaskResponse } from './interface/get-task.interface';

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

const getTaskRequest = () => ({ type: GET_TASK_REQUEST })
const getTaskSuccess = (getTaskData: TaskResponse) => ({ type: GET_TASK_SUCCESS, payload: getTaskData })
const getTaskFailure = (error: any) => ({ type: GET_TASK_FAILURE, payload: error })

export const getTask = () => async (dispatch: Dispatch) => {
    dispatch(getTaskRequest())
    try {
        const response = await axiosInstance.get("task");
        dispatch(getTaskSuccess(response.data.data))
    } catch (error: any) {
        dispatch(getTaskFailure(error.message))
    }
}