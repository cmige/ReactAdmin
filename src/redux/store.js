import { createStore, applyMiddleware, compose  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist' // 用来避免刷新导致store重置
import storage from 'redux-persist/lib/storage';

import Reducers from './reducers/index'

const myReducer = persistReducer({
    key:'root',
    storage,
    blacklist: [
        'category',
        'pictureWall',
        'role'
    ],
},Reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(thunk))
const store = createStore(
    myReducer,
    middlewares
)
export const persistor  = persistStore(store)
export default store