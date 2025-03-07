import { Dispatch } from 'redux';
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_MANY_TASK_FAILURE, DELETE_MANY_TASK_REQUEST, DELETE_MANY_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionTypes";
import { TaskData } from "./interface/create-task.interface";
import axiosInstance from '../../utils/axiosInstance';
import { TaskResponse } from './interface/get-task.interface';
import { UpdateTaskData } from './interface/update-task.interface';
import { UpdateTaskPayload } from '../../pages/Task/interface/update-task.interface';
import { showError } from '../../utils/showErrors';
import { DeleteManyTaskData } from './interface/delete-many-task.interface';


const createTaskRequest = () => ({ type: CREATE_TASK_REQUEST });
const createTaskSuccess = (taskData: TaskData) => ({ type: CREATE_TASK_SUCCESS, payload: taskData });
const createTaskFailure = (error: string) => ({ type: CREATE_TASK_FAILURE, payload: error });

export const createTask = (taskData: TaskData) => async (dispatch: Dispatch) => {
    dispatch(createTaskRequest());
    try {
        const response = await axiosInstance.post("task/create", taskData);
        dispatch(createTaskSuccess(response.data.data));
        return { success: true }
    } catch (error: any) {
        dispatch(createTaskFailure(error.message));
        showError(error.data.message);
    }
}

const getTaskRequest = () => ({ type: GET_TASK_REQUEST });
const getTaskSuccess = (getTaskData: TaskResponse, type: string) => ({ type, payload: getTaskData });
const getTaskFailure = (error: any) => ({ type: GET_TASK_FAILURE, payload: error });

export const getTask = (payload: { startDate: string, endDate: string }, type: string) => async (dispatch: Dispatch) => {
    dispatch(getTaskRequest());
    try {
        const response = await axiosInstance.get(`task?start_date=${payload.startDate}&end_date=${payload.endDate}`);
        console.log("response------", response.data)
        dispatch(getTaskSuccess(response.data.data, type));
    } catch (error: any) {
        dispatch(getTaskFailure(error.message));
        showError(error.data.message);
    }
}

const updateTaskRequest = () => ({ type: UPDATE_TASK_REQUEST });
const updateTaskSuccess = (taskData: UpdateTaskData, type: string) => ({ type: UPDATE_TASK_SUCCESS, payload: taskData, listType: type });
const updateTaskFailure = (error: string) => ({ type: UPDATE_TASK_FAILURE, payload: error });

export const updateTask = (taskData: UpdateTaskData, id: string, type: string) => async (dispatch: Dispatch) => {
    dispatch(updateTaskRequest());
    try {
        const payload: UpdateTaskPayload = {
            ...taskData,
            id
        }
        const response = await axiosInstance.post("task/update", payload);
        dispatch(updateTaskSuccess(response.data.data, type));
        return { success: true }
    } catch (error: any) {
        dispatch(updateTaskFailure(error.message));
        showError(error.data.message);
    }
}

const deleteTaskRequest = () => ({ type: DELETE_TASK_REQUEST });
const deleteTaskSuccess = (id: string) => ({ type: DELETE_TASK_SUCCESS, payload: { id } });
const deleteTaskFailure = (error: string) => ({ type: DELETE_TASK_FAILURE, payload: error });

export const deleteTask = (id: string) => async (dispatch: Dispatch) => {
    dispatch(deleteTaskRequest());
    try {
        await axiosInstance.delete(`task/${id}`);
        dispatch(deleteTaskSuccess(id));
    } catch (error: any) {
        dispatch(deleteTaskFailure(error.message));
        showError(error.data.message);
    }
}

const deleteManyTaskRequest = () => ({ type: DELETE_MANY_TASK_REQUEST });
const deleteManyTaskSuccess = (deleteManyTaskData: DeleteManyTaskData) =>
    ({ type: DELETE_MANY_TASK_SUCCESS, payload: deleteManyTaskData });
const deleteManyTaskFailure = (error: string) => ({ type: DELETE_MANY_TASK_FAILURE, payload: error });

export const deleteManyTask = (deleteManyTaskData: DeleteManyTaskData) => async (dispatch: Dispatch) => {
    dispatch(deleteManyTaskRequest());
    try {
        await axiosInstance.post("task/deletemany", deleteManyTaskData);
        dispatch(deleteManyTaskSuccess(deleteManyTaskData));
    } catch (error: any) {
        dispatch(deleteManyTaskFailure(error.message));
        showError(error?.data?.message);
    }
}