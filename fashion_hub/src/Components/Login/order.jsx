import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../Redux/orderRedux/action';
import { Box, Heading } from '@chakra-ui/react';
export default function Order() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer.orders);
    useEffect(() => {
      dispatch(getAllOrders());
    }, [dispatch]);
  
    return (
      <>
      <Box bgColor={'blackAlpha.100'} pb={'20px'}>
      <Heading pt='20px'>Order History</Heading>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(395px, max-content))",
            gridTemplateRows: "repeat(auto-fill)",
            justifyContent: "center",
            gridGap: "20px 10px",
            margin: "auto",
            marginTop:'20px',
            marginBottom:'20px',
          }}>
          {orders.length ?(orders.map((element) => (
            <OrderCard key={element.id} orders={element} />
          ))):(
            <Box>
              <Heading>Loading...</Heading>
            </Box>
          )}
        </div>
      </Box>
      </>
    );
  }