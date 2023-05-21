import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Pages/Home'
import SignIn from '../Components/Login/SignIn'
import SignUp from '../Components/Login/Signup'
import Admin from './Admin'
import AdminProduct from './AdminProduct'
import Cart from './Cart'
import Edit from './Edit'
import PaymentPage from './PaymentPage'
import Product from './Product'
import SingleProduct from './SingleProduct'
import PrivateRoutes from '../Components/Product/PrivateRoutes'
import UserContainer from '../Components/Login/Usercard'
import Order from '../Components/Login/order'
import SingleOrder from '../Components/Login/SingleOrder'
import OrderPage from './OrderPage'

const MainRoutes = () => {
  return <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/adminpage' element={<PrivateRoutes>
        {<Admin/>}
        </PrivateRoutes>}/>
      <Route path='/users' element={<PrivateRoutes>
        {<UserContainer/>}
      </PrivateRoutes>}/>
      <Route path='/admin' element={<PrivateRoutes>
        {<AdminProduct/>}
      </PrivateRoutes>}/>
      <Route path='/product/:id/edit' element={<Edit/>}/>
      <Route path='/cart' element={<PrivateRoutes>
        <Cart/>
        </PrivateRoutes>}/>
      <Route path='/orders' element={<PrivateRoutes>
        <Order/>
      </PrivateRoutes>}/>
      <Route path={'/orders/:id'} element={<PrivateRoutes>
        <SingleOrder/>
      </PrivateRoutes>}/>
      <Route path={'/getorders'} element={<PrivateRoutes>
        <OrderPage/>
      </PrivateRoutes>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path={'/product/:id'} element={<PrivateRoutes>
        <SingleProduct/>
      </PrivateRoutes>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='*' element={<h2>404 Page Not Found!</h2>}/>
      <Route path='/buynow' element={<PaymentPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
}

export default MainRoutes;
