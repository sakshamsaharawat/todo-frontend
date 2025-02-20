import { Dispatch } from 'redux';
import { UserData } from './interface/user-interface';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './ActionType';
import { LoginData } from './interface/login-interface';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../utils/axiosInstance';

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user: object, token: string) => ({ type: REGISTER_SUCCESS, payload: { user, token } });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axiosInstance.post("/user/signup", userData)
        localStorage.setItem("jwt", response.data.token);
        dispatch(registerSuccess(response.data.data, response.data.token))
        return { success: true, message: 'User registered successfully.' };

    } catch (error: any) {
        dispatch(registerFailure(error.message));
        console.error('Registration error:', error.message)
        return { success: false, message: error.message || 'Registration failed.' };
    }
}

const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (user: object, token: string) => ({ type: LOGIN_SUCCESS, payload: { user, token } })
const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error })

export const login = (UserData: LoginData) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axiosInstance.post("/user/login", UserData)
        const user = response.data;
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        } else {
            console.error("jwt is undefined. Cannot save to localStorage.");
        }
        dispatch(loginSuccess(user, user.token))
        return { success: true, message: "User login successfully.", token: user.token }

    } catch (error: any) {
        dispatch(loginFailure(error))
        console.error("Login error.", error.message)
        return { success: false, message: error.message || "Login Failed" }
    }
}

const getUserRequest = () => ({ type: GET_USER_REQUEST })
const getUserSuccess = (user: object) => ({ type: GET_USER_SUCCESS, payload: user })
const getUserFailure = (error: any) => ({ type: GET_USER_FAILURE, payload: error })

export const getUser = (jwt: string) => async (dispatch: Dispatch) => {
    dispatch(getUserRequest());

    try {
        const decodedToken: any = jwtDecode(jwt);
        const userId = decodedToken.id;
        const response = await axiosInstance.get(`/user/${userId}`)
        dispatch(getUserSuccess(response.data.data));

    } catch (error: any) {
        dispatch(getUserFailure(error.message));
        console.error("Get User error:", error.message);
    }

}
const logoutRequest = () => ({ type: LOGOUT_REQUEST })
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
const logoutFailure = (error: any) => ({ type: LOGOUT_FAILURE, payload: error })

export const logout = () => async (dispatch: Dispatch) => {
    dispatch(logoutRequest());
    try {
        const token = localStorage.getItem("jwt");

        localStorage.removeItem("jwt");

        dispatch(logoutSuccess());

    } catch (error: any) {
        dispatch(logoutFailure(error.message));
    }
};
