import { UserData } from './../interface/user-interface';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType';
import axios from "axios";
import { API_BASE_URL } from "../../config/api.config";
import { Dispatch } from 'redux';
import { LoginData } from '../interface/login-interface';
import { jwtDecode } from 'jwt-decode';

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user: object) => ({ type: REGISTER_SUCCESS, payload: { user } });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });


export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/user/signup`, userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }
        dispatch(registerSuccess(user))
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
        const response = await axios.post(`${API_BASE_URL}/user/login`, UserData)
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
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        const user = response.data;
        dispatch(getUserSuccess(user));

    } catch (error: any) {
        dispatch(getUserFailure(error.message));
        console.error("Get User error:", error.message);
    }
}

