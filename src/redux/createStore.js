import {createStore, applyMiddleware, compose} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddle from 'redux-saga'
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddle()
export const middlewares = [thunk, sagaMiddleware, logger]

const enhancers = compose(
    applyMiddleware(...middlewares),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const store = createStore(
    rootReducer,
    enhancers
)
sagaMiddleware.run(rootSaga)

export default store