import axios from "axios";
import * as types from "./actionTypes";


const register = (payload) => (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios.post(`https://zealous-girdle-cow.cyclic.app/register`, payload)  
    .then((r) => {
      dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
      return types.REGISTER_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.REGISTER_FAILURE, payload: e });
      return types.REGISTER_FAILURE;
    });
};

const login = (params) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios.post("https://zealous-girdle-cow.cyclic.app/login", params)  
    .then(async (r) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data });
      localStorage.setItem('isLoggedIn', true);
      const token = r.data.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get("https://zealous-girdle-cow.cyclic.app/users", config);
      const user = response.data;
      dispatch({ type: types.GET_USER_SUCCESS, payload: user });
      localStorage.setItem('user', JSON.stringify(user));
      return types.LOGIN_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
      return types.LOGIN_FAILURE;
    });
};

export const adminLogin = (params) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios.post("https://zealous-girdle-cow.cyclic.app/admin/login", params)  
    .then((r) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data });
      localStorage.setItem('isLoggedIn', true);
      return types.LOGIN_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
      return types.LOGIN_FAILURE;
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  dispatch({ type: types.LOGOUT });
};

export const removeUserSuccess=(_id)=>{
  return{type:types.REMOVE_USER_SUCCESS,payload:_id};
}

export const getUserDetails=()=>(dispatch, getState)=>{
  const token = getState().authreducer.token;
  const config = {
    headers: {Authorization: `Bearer ${token}` }
  };
  dispatch({ type: types.USER_REQUEST });
  return axios.get('https://zealous-girdle-cow.cyclic.app/allusers', config)  
    .then((r)=>{
      dispatch({ type: types.GET_ALL_USER_SUCCESS, payload: r.data });
      return types.GET_ALL_USER_SUCCESS ;
    })
    .catch((e) => {
      dispatch({ type: types.USER_FAILURE, payload: e });
      return types.USER_FAILURE;
    });
};





export { register,login };