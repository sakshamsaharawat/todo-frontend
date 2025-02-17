import { Dispatch } from "redux";
import { GET_CALENDAR_FAILURE, GET_CALENDAR_REQUEST, GET_CALENDAR_SUCCESS } from "./ActionType"
import axiosInstance from "../../utils/axiosInstance";

const getCalendarRequest = () => ({ type: GET_CALENDAR_REQUEST });
const getCalendarSuccess = (calendarData: any) => ({ type: GET_CALENDAR_SUCCESS, payload: calendarData });
const getCalendarFailure = (error: any) => ({ type: GET_CALENDAR_FAILURE, payload: error });

export const getCalendarTask = (payload: { startDate: string, endDate: string }) => async (dispatch: Dispatch) => {
    dispatch(getCalendarRequest())
    try {
        const response = await axiosInstance.get(`task?start_date=${payload.startDate}&end_date=${payload.endDate}`)
        console.log("response-clllllll", response)
        const calendarPayload = []
        for (const task of response.data.data) {
            const taskDueDate: Date = new Date(task.due_date);
            calendarPayload.push({
                title: task.title,
                start: new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate(), taskDueDate.getHours(), taskDueDate.getMinutes()),
                end: new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate(), taskDueDate.getHours(), taskDueDate.getMinutes())
            })
        }
        dispatch(getCalendarSuccess(calendarPayload))
    } catch (error) {
        console.error(error)
        dispatch(getCalendarFailure(error))
    }
}