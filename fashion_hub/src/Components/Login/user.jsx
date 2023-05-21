import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function User({ users }) {
  return (
    <Box textAlign={'left'} m='10px' w='max-content' border={'1px solid black'} p='20px' borderRadius={'10px'}>
          <Text>User ID: {users._id}</Text>
          <Text>Username: {users.name}</Text>
          <Text>Email: {users.email}</Text>
          <Link to={`/orders/${users._id}`}>
          <Button bgColor='green.400' m='10px' h='30px'>See all orders</Button>
          </Link>
    </Box>
  );
}
