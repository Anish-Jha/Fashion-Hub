import axios from "axios";
import { GET_Home_SUCCESS, Home_FAILURE, Home_REQUEST } from "./actiontypes"

export const getHomeSuccess=(payload)=>{
    return {type:GET_Home_SUCCESS,payload};
};


export const HomeRequest=()=>{
    return {type:Home_REQUEST};
}

export const HomeFailure=()=>{
    return {type:Home_FAILURE};
}

export const getHome=()=>(dispatch)=>{
    dispatch(HomeRequest());
    axios.get("https://zealous-girdle-cow.cyclic.app/home").then((res)=>{
        dispatch(getHomeSuccess(res.data));
        
    }).catch(()=>{
        dispatch(HomeFailure());
    })
}
