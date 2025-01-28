import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    auth: {
        user: null,
        jwt: null,
        isLoading: false,
        error: null,
    },
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, loading: true, error: null }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, jwt: action.payload.jwt, }

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, loading: true, error: action.payload }

        default:
            return state;
    }
}


