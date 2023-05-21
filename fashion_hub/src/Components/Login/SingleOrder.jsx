import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrders } from '../../Redux/orderRedux/action';
import { Box, Button, Image, Text } from '@chakra-ui/react';

export default function SingleOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [delivered, setDelivered]=useState(false);
  
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const orders = useSelector((store) => store.orderReducer.orders);

  const filteredOrders = orders && orders.filter((order) => order.userID === id);

  return (
    <Box  display="grid" gridTemplateColumns="repeat(auto-fill, minmax(350px, max-content))" gridTemplateRows="repeat(auto-fill)" 
    gridGap= "20px 20px" margin= "auto" textAlign={'left'} mt={'20px'} w='98%'>
      {filteredOrders && filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Box key={order._id} display={'flex'} gap={'20px'} p='5px' 
          boxShadow='rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'>
            <Image w='100px' src={order.product.image}/>
            <Box>
            <Text>{order._id}</Text>
            <Text w={['150px','150px','200px','250px']} textOverflow={'clip'} whiteSpace={'nowrap'} overflow={'hidden'}>Name: {order.product.name}</Text>
            <Text>Price: {order.product.price}</Text>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Delivered: {order.isDelivered ? 'Yes' : 'No'}</Text>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No orders found for the user.</Text>
      )}
    </Box>
  );
}
