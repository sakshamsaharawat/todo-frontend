import { CREATE_LIST_FAILURE, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "./Action.type";

const initialState = {
    list: {
        list: [],
        isLoading: false,
        error: null,
    },
}

export const listReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_LIST_REQUEST:
        case CREATE_LIST_REQUEST:
            return { ...state, isLoading: true, error: null }

        case GET_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload,
            }
        case CREATE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload,
            }

        case GET_LIST_FAILURE:
        case CREATE_LIST_FAILURE:
            return { ...state, list: { error: action.payload, list: [], isLoading: false } }

        default:
            return state;
    }
}