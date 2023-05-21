import { getLocalData, saveLocalData } from "../../Utilities/localstorage";
import * as types from "./actionTypes";

const initialState = {
  isAuth: getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  isLoading: false,
  user: getLocalData("user") || [],
  users:[],
  isError: false,
};

const reducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case types.REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case types.REGISTER_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case types.LOGIN_SUCCESS:
      saveLocalData("token", payload.token);
      return { ...state, isLoading: false, isAuth: true, token: payload.token };

    case types.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuth: false, token: "" }; 
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        token: "",
      };
    case types.USER_REQUEST:
      return{...state, isLoading:true};
    case types.GET_USER_SUCCESS:
      saveLocalData("user", payload);
      return{...state, isLoading:false, user:payload}
    case types.GET_ALL_USER_SUCCESS:
      return{...state, isLoading:false, users:payload}
    case types.USER_FAILURE:
      return {...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
export { reducer };