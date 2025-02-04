import { CREATE_TAG_FAILURE, CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, GET_TAG_FAILURE, GET_TAG_REQUEST, GET_TAG_SUCCESS } from "./Action.type"

const initialState = {
    tag: {
        tag: [],
        isLoading: false,
        error: null
    },
}

export const tagReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TAG_REQUEST:
        case CREATE_TAG_REQUEST:
            return { ...state, isLoading: true, error: null }

        case GET_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tag: action.payload,
            };
        case CREATE_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tag: action.payload,
            };

        case GET_TAG_FAILURE:
        case CREATE_TAG_FAILURE:
            return { ...state, tag: { error: action.payload, tag: [], isLoading: false } }

        default:
            return state
    }
}