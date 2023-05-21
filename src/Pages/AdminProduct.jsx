import { Text,Button,Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Filter from '../Components/Product/Filter'
import AdminList from '../Components/Product/AdminList'
import '../CSS/Product.css'
import { useSelector } from 'react-redux'

export default function AdminProduct() {

  const products = useSelector((store) => {
    return store.product.product;
  });
  
  return (
    <Box>
    {/* <Navbar/> */}
    <Heading fontSize={'16px'}>Welcome back, Admin!</Heading>
      {/* sort and filter container */}
      <Box display={['block','block','flex','flex']} m='auto' mt='20px' w='90%' gap={'20px'}>
        <Filter/>
        <Box display='inline-block' m='5px' w={'max-content'} p='8px' borderRadius={'5px'} bgColor={'lightpink'}>
          <Text fontSize={'16px'} fontWeight={'600'} >Total Products: {products.length}</Text>
        </Box>
        <Link to='/adminpage'>
        <Button display='inline-block' m='5px' w={'max-content'}  variant={'unstyled'} p='10px' bgColor={'lightgreen'}>
          Add new product
        </Button>
        </Link>
        <Link to='/users'>
        <Button display='inline-block' m='5px' w={'max-content'}  variant={'unstyled'} p='10px' bgColor={'lightgreen'}>
          See all users
        </Button>
        </Link>

        <Link to='/orders'>
        <Button display='inline-block' m='5px' w={'max-content'}  variant={'unstyled'} p='10px' bgColor={'lightgreen'}>
          Order history
        </Button>
        </Link>
        
      </Box>
      <div>
        <AdminList/>
      </div>
    </Box>
  )
}
