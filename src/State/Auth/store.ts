import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { authReducer } from "./Reducer";
import { thunk } from "redux-thunk";

const rootReducers = combineReducers({
    auth: authReducer,
})
export type RootState = ReturnType<typeof rootReducers>;
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));