import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { authReducer } from "../src/State/Auth/Reducer";
import { thunk } from "redux-thunk";
import { listReducer } from "./State/List/Reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    list: listReducer,
})
export type RootState = ReturnType<typeof rootReducers>;
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));