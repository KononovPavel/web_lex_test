import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {usersReducer} from "./reducer/usersReducer";


const rootReducer = combineReducers({
    users:usersReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store
