import { Text,Button,Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Filter from '../Components/Product/Filter'
import AdminList from '../Components/Product/AdminList'
import logo from '../Components/Product/image/row.png'
import '../CSS/Product.css'
import { useSelector } from 'react-redux'
// import Navbar from '../Components/Navbar/Navbar'

export default function AdminProduct() {

  const products = useSelector((store) => {
    return store.product.product;
  });
  
  return (
    // whole container
    <Box>
    {/* <Navbar/> */}
    <Heading fontSize={'16px'}>Welcome back, Admin!</Heading>
      {/* sort and filter container */}
      <div className="product-filters-container">
        <Box p='8px' borderRadius={'5px'} bgColor={'lightpink'}><Text fontSize={'16px'} fontWeight={'600'} >Total Products: {products.length}</Text></Box>
        <Link to='/adminpage'>
        <Button variant={'unstyled'} p='10px' bgColor={'lightgreen'}>
          Add new product
        </Button>
        </Link>
      </div>
      <div>
        <AdminList/>
      </div>
    </Box>
  )
}
