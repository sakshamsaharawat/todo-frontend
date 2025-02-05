import { CREATE_TAG_FAILURE, CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, GET_TAG_FAILURE, GET_TAG_REQUEST, GET_TAG_SUCCESS } from "./Action.type"
import { InitialState } from "./interface/tag-state.interface";

const initialState: InitialState = {
    tags: [],
    isLoading: false,
    error: null
}

export const tagReducer = (state: InitialState = initialState, action: any): InitialState => {
    switch (action.type) {
        case GET_TAG_REQUEST:
            return {
                ...state,
                tags: [],
                isLoading: true,
                error: null
            }
        case CREATE_TAG_REQUEST:
            return {
                ...state,
                tags: state.tags,
                isLoading: true,
                error: null
            }
        case GET_TAG_SUCCESS:
            return {
                ...state,
                tags: action.payload,
                error: null,
                isLoading: false
            };
        case CREATE_TAG_SUCCESS:
            return {
                ...state,
                tags: [...state.tags, action.payload],
                isLoading: false,
                error: null
            };
        case GET_TAG_FAILURE:
            return {
                ...state,
                error: action.payload,
                tags: [],
                isLoading: false
            }
        case CREATE_TAG_FAILURE:
            return {
                ...state,
                error: action.payload,
                tags: state.tags,
                isLoading: false
            }
        default:
            return state;
    }
}