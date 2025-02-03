import { GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "./Action.type"

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
            return { ...state, loading: true, error: null }

        case GET_LIST_SUCCESS:
            return { ...state, loading: false, list: action.payload }

        case GET_LIST_FAILURE:
            return { ...state, loading: true, error: action.payload }

        default:
            return state;
    }
}