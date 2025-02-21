import { CREATE_LIST_REQUEST } from "../List/Action.type";
import { CREATE_STICKY_WALL_FAILURE, CREATE_STICKY_WALL_SUCCESS, GET_STICKY_WALL_FAILURE, GET_STICKY_WALL_REQUEST, GET_STICKY_WALL_SUCCESS } from "./ActionType";
import { StickyWallIntialState } from "./interface/stickywall-state.interface";

const intialState: StickyWallIntialState = {
    stickyWalls: [],
    isLoading: false,
    error: null
}
export const stickywallReducer = (state: StickyWallIntialState = intialState, action: any): StickyWallIntialState => {
    switch (action.type) {
        case GET_STICKY_WALL_REQUEST:
            return {
                ...state,
                stickyWalls: [],
                isLoading: true,
                error: null
            }
        case CREATE_LIST_REQUEST:
            return {
                ...state,
                stickyWalls: state.stickyWalls,
                isLoading: true,
                error: null
            }
        case GET_STICKY_WALL_SUCCESS:
            return {
                ...state,
                stickyWalls: action.payload,
                isLoading: true,
                error: null
            }
        case CREATE_STICKY_WALL_SUCCESS:
            return {
                ...state,
                stickyWalls: [...state.stickyWalls, action.payload],
                isLoading: false,
                error: null
            }
        case GET_STICKY_WALL_FAILURE:
            return {
                ...state,
                stickyWalls: [],
                isLoading: true,
                error: null
            }
        case CREATE_STICKY_WALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                stickyWalls: [],
                isLoading: false
            }
        default:
            return state;
    }
}