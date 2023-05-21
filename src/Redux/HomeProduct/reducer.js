import { GET_Home_SUCCESS, Home_FAILURE, Home_REQUEST} from './actiontypes'


const initialState={
    isLoading:false,
    home:[],
    isError:false,
}

export const reducer=(state=initialState,{type,payload})=>{
    switch(type){
        case Home_REQUEST:
            return{...state, isLoading:true};
        case Home_FAILURE:
            return{...state,isLoading:false, isError:true}
        case GET_Home_SUCCESS:
            return{...state, isLoading:false, home:payload}
        default:
            return state;
    }
}