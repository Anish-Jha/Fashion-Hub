import axios from "axios";
import { GET_ALL_ORDER_SUCCESS,GET_ORDER_SUCCESS, ORDER_FAILURE, ORDER_REQUEST } from "./actiontypes"

export const getOrderSuccess=(payload)=>{
    return {type:GET_ORDER_SUCCESS,payload};
};

export const getAllOrderSucess=(payload)=>{
    return {type:GET_ALL_ORDER_SUCCESS,payload};
};

export const OrderRequest=()=>{
    return {type:ORDER_REQUEST};
}

export const OrderFailure=()=>{
    return {type:ORDER_FAILURE};
}

export const getAllOrders=()=>(dispatch,getState)=>{
    const token = getState().authreducer.token;
    const config = {
        headers: {Authorization: `Bearer ${token}` }
      };
    dispatch(OrderRequest());
   axios.get("https://zealous-girdle-cow.cyclic.app/orders",config).then((res)=>{
    console.log(res.data);
      dispatch(getAllOrderSucess(res.data));
    }).catch(()=>{
        dispatch(OrderFailure());
    })
}

export const getOrders=()=>(dispatch,getState)=>{
    const token = getState().authreducer.token;
    const config = {
        headers: {Authorization: `Bearer ${token}` }
      };
    dispatch(OrderRequest());
   axios.get("https://zealous-girdle-cow.cyclic.app/orderlist",config).then((res)=>{
    console.log(res.data);
      dispatch(getOrderSuccess(res.data));
    }).catch(()=>{
        dispatch(OrderFailure());
    })
}

