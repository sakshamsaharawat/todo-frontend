import { CREATE_LIST_FAILURE, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "./Action.type";
import { InitialState } from "./interface/list-state.interface";

const initialState: InitialState = {
    lists: [],
    isLoading: false,
    error: null,
}

export const listReducer = (state: InitialState = initialState, action: any): InitialState => {
    switch (action.type) {
        case GET_LIST_REQUEST:
            return { 
                ...state, 
                lists: [], 
                isLoading: true, 
                error: null 
            }
        case CREATE_LIST_REQUEST:
            return { 
                ...state, 
                lists: state.lists, 
                isLoading: true, 
                error: null 
            }
        case GET_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                lists: action.payload, 
                
                error: null
            }
        case CREATE_LIST_SUCCESS:
            return {
                ...state,
                lists: [...state.lists, action.payload], 
                isLoading: false, 
                error: null
            }
        case GET_LIST_FAILURE:
            return { 
                ...state, 
                error: action.payload, 
                lists: [], 
                isLoading: false 
            }
        case CREATE_LIST_FAILURE:
            return { 
                ...state, 
                error: action.payload, 
                lists: state.lists, 
                isLoading: false 
            }
        default:
            return state;
    }
}