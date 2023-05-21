import { GET_CART_SUCCESS, PRODUCT_FAILURE,REMOVE_CART_SUCCESS, PRODUCT_REQUEST,POST_PRODUCT_SUCCESS,PATCH_CART_SUCCESS } from "./actionTypes"


const initialState={
    isLoading:false,
    items:[],
    isError:false,
}

export const reducer=(state=initialState,{type,payload})=>{
    switch(type){
        case PRODUCT_REQUEST:
            return{...state, isLoading:true};
        case PRODUCT_FAILURE:
            return{...state,isLoading:false, isError:true}
        case POST_PRODUCT_SUCCESS:
            return{...state, isLoading:false};
        case GET_CART_SUCCESS:
            return{...state, isLoading:false, items:payload}
        case PATCH_CART_SUCCESS:
              return {...state, isLoading: false};
        case REMOVE_CART_SUCCESS:
            const updatedCartList = state.items.filter(items => items._id!==payload);
            return {...state,items: updatedCartList,isLoading: false,isError: false};
        default:
            return state;
    }
}