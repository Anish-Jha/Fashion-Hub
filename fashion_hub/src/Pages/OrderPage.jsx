import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrders } from '../Redux/orderRedux/action';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import cart from './cart.png'
export default function OrderPage() {
  const user=JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [delivered, setDelivered]=useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector((store) => store.orderReducer.order);
 console.log(user,'user');
 console.log(orders,'orders')
 const filteredOrders = orders && orders.filter((order) => order.userID === user._id);

  return (
    <Box>
      <Box w={['90%','80%','70%']} m='auto'><Heading textAlign={'left'} fontFamily={'Popins,Sans-Serif'}>Your Orders</Heading></Box>
      {filteredOrders && filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Box key={order._id} w={['90%','80%','70%']} m='auto' borderRadius={'10px'} mt='10px' outline={'1px solid grey'} mb='10px'>
            <Box textAlign={'left'} bgColor={'gray.100'} p='5px'>
            <Text>Order Id: {order._id}</Text>
            </Box>
            <Box display={'flex'} gap={'20px'} p='5px' bgColor={'whitesmoke'}>
            <Image w='100px' src={order.product.image}/>
            <Box textAlign={'left'}>
            <Text overflow={'hidden'}>Name: {order.product.name}</Text>
            <Text>Price: {order.product.price}</Text>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Delivered: {order.isDelivered ? 'Yes' : 'No'}</Text>
            </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box m='auto' w='auto' h='400px'>
            <Image m='auto' src={cart}/>
            <Heading fontFamily={'Popins Sans-Serif'} mt='20'>Hmm... You have not made any orders :{'('}</Heading>
        </Box>
      )}
    </Box>
  );
}
