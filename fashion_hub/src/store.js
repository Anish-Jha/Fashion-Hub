import { applyMiddleware, legacy_createStore,combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as product} from "./Redux/ProductRedux/reducer"
import {reducer as homeReducer} from "./Redux/HomeProduct/reducer"
import {reducer as authreducer} from './Redux/AuthRedux/reducer'
import {reducer as cartReducer} from './Redux/cartRedux/reducer'
import {reducer as orderReducer} from './Redux/orderRedux/reducer'
const rootReducer=combineReducers({product,homeReducer,authreducer,cartReducer,orderReducer})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));