import * as types from "./actiontypes";
import { getLocalData, saveLocalData } from "../../Utilities/localstorage";
const initialState = {
  isLoading: false,
  order: getLocalData("order") || [],
  orders:[],
  isError: false,
};

const reducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case types.ORDER_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_ORDER_SUCCESS:
        saveLocalData("order", payload.order);
      return{...state, isLoading:false, order:payload}
    case types.GET_ALL_ORDER_SUCCESS:
      return{...state, isLoading:false, orders:payload}
    case types.ORDER_FAILURE:
      return {...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
export { reducer };