import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    auth: {
        user: null,
        jwt: localStorage.getItem("token") || null,
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
            localStorage.setItem("token", action.payload.token);
            return { ...state, loading: false, auth: { user: action.payload, jwt: action.payload.token, isLoading: false, error: null } }

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, loading: true, error: action.payload }

        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                auth: {
                    user: null,
                    jwt: null,
                    isLoading: false,
                    error: null
                }
            };

        default:
            return state;
    }
}


