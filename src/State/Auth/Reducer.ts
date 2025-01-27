import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

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
            return { ...state, loading: true, error: null }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, jwt: action.payload.jwt, }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, loading: true, error: action.payload }
            
            default:
                return state; 
            }
    }


