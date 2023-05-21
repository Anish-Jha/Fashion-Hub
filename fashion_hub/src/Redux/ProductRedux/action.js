import axios from "axios";
import { GET_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST,POST_PRODUCT_SUCCESS,PATCH_PRODUCT_SUCCESS,REMOVE_PRODUCT_SUCCESS } from "./actiontypes"

export const getProductSuccess=(payload)=>{
    return {type:GET_PRODUCT_SUCCESS,payload};
};


export const productRequest=()=>{
    return {type:PRODUCT_REQUEST};
}

export const productFailure=()=>{
    return {type:PRODUCT_FAILURE};
}

export const postProductSuccess=()=>{
    return {type:POST_PRODUCT_SUCCESS};
}

export const removeProductSuccess = (id) => {
    return { type: REMOVE_PRODUCT_SUCCESS, payload:id };
};

export const getProduct=(params)=>(dispatch)=>{
    dispatch(productRequest());
   axios.get("https://zealous-girdle-cow.cyclic.app/product",params).then((res)=>{
      dispatch(getProductSuccess(res.data));
    }).catch(()=>{
        dispatch(productFailure());
    })
}

export const addProduct=(payload)=>(dispatch,getState)=>{
  const token = getState().authreducer.token;
  const config = {
    headers: {Authorization: `Bearer ${token}` }
  };
    dispatch(productRequest());
    axios.post("https://zealous-girdle-cow.cyclic.app/addproduct", payload,config).then(()=>{
        dispatch(postProductSuccess());
    }).catch(()=>{
        dispatch(productFailure());
    })
}

export const editProduct=(id,newData)=>(dispatch,getState)=>{
  const token = getState().authreducer.token;
  const config = {
    headers: {Authorization: `Bearer ${token}` }
  };
    dispatch(productRequest());
    axios.patch(`https://zealous-girdle-cow.cyclic.app/product/edit/${id}`,newData,config).then(()=>{
        dispatch({type:PATCH_PRODUCT_SUCCESS})
    }).catch(()=>{
        dispatch(productFailure());
    })
}

export const removeProduct = (id) => (dispatch,getState) => {
    const token = getState().authreducer.token;
    const config = {
      headers: {Authorization: `Bearer ${token}` }
    };
    dispatch(productRequest());
    axios.delete(`https://zealous-girdle-cow.cyclic.app/product/delete/${id}`,config).then(() => {
      dispatch(removeProductSuccess(id));
    }).catch(() => {
      dispatch(productFailure());
    });
};

