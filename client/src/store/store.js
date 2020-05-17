import { createStore, compose, applyMiddleware } from 'redux'
import rootReducers from './reducer/rootReducer'
import thunk from 'redux-thunk'

const middleware = [thunk]

const store = createStore(rootReducers, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;