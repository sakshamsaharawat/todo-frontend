import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType';
import axios from "axios";
import { API_BASE_URL } from "../../config/api.config";
import { UserData } from '../interface/user-interface';
import { Dispatch } from 'redux';

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user: object, jwt: string) => ({ type: REGISTER_SUCCESS, payload: { user, jwt } });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });


export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/user/signup`, userData)
        console.log(response)
        const user = response.data;
        console.log("user Data",user)
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }
        dispatch(registerSuccess(user, user.jwt))

    } catch (error: any) {
        dispatch(registerFailure(error.message));
        console.error('Registration error:', error.message)
    }
}