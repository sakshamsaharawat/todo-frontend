import { Dispatch } from "redux";
import { CREATE_LIST_FAILURE, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "./Action.type";
import { ListResponse } from "./interface/get-list.interface";
import { ListData } from "./interface/create-list.interface";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const createListRequest = () => ({ type: CREATE_LIST_REQUEST });
const createListSuccess = (listData: ListData) => ({ type: CREATE_LIST_SUCCESS, payload: listData });
const createListFailure = (error: string) => ({ type: CREATE_LIST_FAILURE, payload: error });

export const CreateList = (listData: ListData) => async (dispatch: Dispatch) => {
    dispatch(createListRequest());
    try {
        const response = await axiosInstance.post('list/create', listData);
        dispatch(createListSuccess(response.data.data));
        return { success: true, message: 'List created successfully.' };

    } catch (error: any) {
        dispatch(createListFailure(error.message));
        toast.error(error.data.message[0]);
        if (error?.status === 401) {
            return {
                success: false,
                message: "Session expired. Please log in again.",
                isAuthError: true,
            };
        }

        return {
            success: false,
            message: error?.response?.data?.message || "List creation failed.",
        };
    }
}

const getListRequest = () => ({ type: GET_LIST_REQUEST });
const getListSuccess = (list: ListResponse[]) => ({ type: GET_LIST_SUCCESS, payload: list });
const getListFailure = (error: any) => ({ type: GET_LIST_FAILURE, payload: error });

export const getList = () => async (dispatch: Dispatch) => {
    dispatch(getListRequest());
    try {
        const response = await axiosInstance.get("list");
        dispatch(getListSuccess(response.data.data));
    } catch (error: any) {
        dispatch(getListFailure(error.message));
        toast.error(error.data.message[0]);
    }
}