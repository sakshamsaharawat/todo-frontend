import { Dispatch } from 'redux';
import { CREATE_STICKY_WALL_FAILURE, CREATE_STICKY_WALL_REQUEST, CREATE_STICKY_WALL_SUCCESS, GET_STICKY_WALL_FAILURE, GET_STICKY_WALL_REQUEST, GET_STICKY_WALL_SUCCESS } from './ActionType';
import { CreateStickywall } from './interface/create-stickywall.interface';
import axiosInstance from '../../utils/axiosInstance';
import { stickywallItem } from './interface/get-stickywall.interface';
const createStickyWallRequest = () => ({ type: CREATE_STICKY_WALL_REQUEST })
const createStickyWallSucsess = (stickyWallData: CreateStickywall) => ({ type: CREATE_STICKY_WALL_SUCCESS, payload: stickyWallData })
const createStickyWallFailure = (error: string) => ({ type: CREATE_STICKY_WALL_FAILURE, payload: error })

export const createStickyWall = (stickyWallData: CreateStickywall) => async (dispatch: Dispatch) => {
    dispatch(createStickyWallRequest())
    try {
        const response = await axiosInstance.post("stickywall/create", stickyWallData)
        dispatch(createStickyWallSucsess(response.data.data))
    } catch (error: any) {
        dispatch(createStickyWallFailure(error.message))
    }
}

const getStickyWallRequest = () => ({ type: GET_STICKY_WALL_REQUEST })
const getStickyWallSuccess = (stickyWallData: stickywallItem) => ({ type: GET_STICKY_WALL_SUCCESS, payload: stickyWallData })
const getStickyWallFailure = (error: string) => ({ type: GET_STICKY_WALL_FAILURE, payload: error })

export const getStickyWall = (stickyWallData: stickywallItem) => async (dispatch: Dispatch) => {
    dispatch(getStickyWallRequest())
    try {
        const response = await axiosInstance.post("stickywall", stickyWallData)
        dispatch(getStickyWallSuccess(response.data.data))
    } catch (error: any) {
        dispatch(getStickyWallFailure(error.message))
    }
}