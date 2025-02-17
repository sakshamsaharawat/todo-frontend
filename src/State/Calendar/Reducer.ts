import { GET_CALENDAR_FAILURE, GET_CALENDAR_REQUEST, GET_CALENDAR_SUCCESS } from "./ActionType";
import { CalendarInitialState } from "./Interface/state.interface";

const initialState: CalendarInitialState = {
    tasks: [],
    isLoading: false,
    error: null

}

export const calendarTaskReducer = (state: CalendarInitialState = initialState, action: any): CalendarInitialState => {
    switch (action.type) {
        case GET_CALENDAR_REQUEST:
            return {
                ...state,
                tasks: [],
                isLoading: true,
                error: null
            }
        case GET_CALENDAR_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                isLoading: false,
                error: null
            }
        case GET_CALENDAR_FAILURE:
            return {
                ...state,
                tasks: [],
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}