import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { authReducer } from "../src/State/Auth/Reducer";
import { thunk } from "redux-thunk";
import { listReducer } from "./State/List/Reducer";
import { tagReducer } from "./State/Tag/Reducer";
import { taskReducer } from "./State/AddTask/Reducer";
import { stickywallReducer } from "./State/stickyWall/Reducer";

const rootReducers = combineReducers({
    authReducer,
    listReducer,
    tagReducer,
    taskReducer,
    stickywallReducer
})
export type RootState = ReturnType<typeof rootReducers>;
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));