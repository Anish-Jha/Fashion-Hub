import axios from "axios";
import { GET_CART_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST,POST_PRODUCT_SUCCESS,PATCH_CART_SUCCESS,REMOVE_CART_SUCCESS } from "./actionTypes"

export const getCartSuccess=(payload)=>{
    return {type:GET_CART_SUCCESS,payload};
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

export const removeCartSuccess = (id) => {
    return { type: REMOVE_CART_SUCCESS, payload:id };
};


export const getCart=()=>(dispatch,getState)=>{
    const token = getState().authreducer.token;
    const config = {
        headers: {Authorization: `Bearer ${token}` }
      };
    dispatch(productRequest());
   axios.get("https://zealous-girdle-cow.cyclic.app/getcart",config).then((res)=>{
      dispatch(getCartSuccess(res.data));
    }).catch(()=>{
        dispatch(productFailure());
    })
}

export const addToCart=(payload)=>(dispatch,getState)=>{
    const token = getState().authreducer.token;
    const config = {
      headers: {Authorization: `Bearer ${token}` }
    };
    dispatch(productRequest());
    axios.post("https://zealous-girdle-cow.cyclic.app/addtocart",payload,config).then(()=>{
        dispatch(postProductSuccess());
    }).catch(()=>{
        dispatch(productFailure());
    })
}

export const removeCart = (id) => (dispatch,getState) => {
    const token = getState().authreducer.token;
    const config = {
      headers: {Authorization: `Bearer ${token}` }
    };
    dispatch(productRequest());
    axios.delete(`https://zealous-girdle-cow.cyclic.app/removefromcart/${id}`,config).then(() => {
      dispatch(removeCartSuccess(id));
    }).catch(() => {
      dispatch(productFailure());
    });
};

export const updateCart = (id,quantity) => (dispatch,getState) => {
    const token = getState().authreducer.token;
    const config = {
      headers: {Authorization: `Bearer ${token}` }
    };
    dispatch(productRequest());
    axios.patch(`https://zealous-girdle-cow.cyclic.app/updatecart/${id}`,{quantity},config).then(() => {
      dispatch({type:PATCH_CART_SUCCESS});
    }).catch(() => {
      dispatch(productFailure());
    });
};

export const emptyCart=()=>(dispatch,getState)=>{
  const id=getState().authreducer.user._id;
  console.log(id,'ii');
  const token = getState().authreducer.token;
  const config = {
    headers: {Authorization: `Bearer ${token}` }
  };
  dispatch(productRequest());
  axios.delete(`https://zealous-girdle-cow.cyclic.app/emptycart/${id}`,config).then(() => {
    dispatch(removeCartSuccess(id));
  }).catch(() => {
    dispatch(productFailure());
  });
};

