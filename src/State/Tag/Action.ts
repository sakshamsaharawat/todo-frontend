import { Dispatch } from "redux";
import { GET_TAG_FAILURE, GET_TAG_REQUEST, GET_TAG_SUCCESS } from "./Action.type";
import { TagResponse } from "./interface/get-tag.interface";
import axiosInstance from "../../utils/axiosInstance";
import { CREATE_LIST_FAILURE, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS } from "../List/Action.type";
import { TagData } from "./interface/create-tag.interface";

const createTagRequest = () => ({ type: CREATE_LIST_REQUEST })
const createTagSuccess = (tagData: TagData) => ({ type: CREATE_LIST_SUCCESS, payload: tagData })
const createTagFailure = (error: any) => ({ type: CREATE_LIST_FAILURE, payload: error })

export const createTag = (tagData: TagData) => async (dispatch: Dispatch) => {
    dispatch(createTagRequest());
    try {
        const response = await axiosInstance.post("tag/create", tagData);
        dispatch(createTagSuccess(response.data.data));
        return { success: true, message: "Tag created successfully." };
    } catch (error: any) {
        dispatch(createTagFailure(error.message));
        console.error("Tag error:", error.message);
        if (error?.status === 401) {
            return {
                success: false,
                message: "Session expired. Please log in again.",
                isAuthError: true,
            };
        }

        return {
            success: false,
            message: error?.data?.message || "Tag creation failed.",
        };
    }
};
const getTagRequest = () => ({ type: GET_TAG_REQUEST })
const getTagSuccess = (tag: TagResponse) => ({ type: GET_TAG_SUCCESS, payload: tag })
const getTagFailure = (error: any) => ({ type: GET_TAG_FAILURE, payload: error })

export const getTag = () => async (dispatch: Dispatch) => {
    dispatch(getTagRequest())
    try {
        const response = await axiosInstance.get("tag");
        dispatch(getTagSuccess(response.data.data))
    } catch (error: any) {
        dispatch(getTagFailure(error.message))
        console.error("Get List error:", error.message);
    }
} 