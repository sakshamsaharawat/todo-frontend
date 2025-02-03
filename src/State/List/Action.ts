import { Dispatch } from "redux";
import { GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "./Action.type";
import { API_BASE_URL } from "../../config/api.config";
import axios from "axios";
import { ListResponse } from "./interface/get-list.interface";

const getListRequest = () => ({ type: GET_LIST_REQUEST })
const getListSuccess = (list: ListResponse[]) => ({ type: GET_LIST_SUCCESS, payload: list })
const getListFailure = (error: any) => ({ type: GET_LIST_FAILURE, payload: error })

export const getList = () => async (dispatch: Dispatch, getState: any) => {
    dispatch(getListRequest());
    try {
        const token = localStorage.getItem("token") || getState().auth.jwt;
        if (!token) throw new Error("Unauthorized - No Token Found");
        console.log("action--token", token)

        const response = await axios.get(`${API_BASE_URL}/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getListSuccess(response.data));
    } catch (error: any) {
        dispatch(getListFailure(error.message));
        console.error("Get List error:", error.message);
    }
}