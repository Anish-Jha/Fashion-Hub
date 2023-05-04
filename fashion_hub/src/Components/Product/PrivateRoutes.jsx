import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoutes({children}) {
    const isAuth=useSelector((store)=>store.authreducer.isAuth);
    const location=useLocation();

    if(!isAuth){
        return<Navigate state={location.pathname} to={'/signin'} replace/>
    }
  return children;
}
