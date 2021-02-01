import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window === 'object' &&
typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
window.__REDUX_DEVTOOLS_EXTENSION__() : f => f) || compose;



const reducers = combineReducers({
    auth: authReducer,
    ui : uiReducer,
    notes: notesReducer
});


const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );

export default store;
