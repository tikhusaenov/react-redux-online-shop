import {createStore, applyMiddleware, compose} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from "./rootReducer";

export const middlewares = [thunk, logger]

const enhancers = compose(
    applyMiddleware(...middlewares),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const store = createStore(
    rootReducer,
    enhancers
)

export default store