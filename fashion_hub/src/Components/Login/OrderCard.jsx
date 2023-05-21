import { Box, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function OrderCard({orders}) {
  return (
    <Box display={'flex'} bgColor={'#64FF'} textColor={'white'} m='auto' w='max-content' gap='10px' boxShadow='rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset' p={'5px'} borderRadius={'10px'} textAlign={'left'}>
    <Image m={'auto'} w='100px' borderRadius={'5px'} src={orders.product.image}/>
   <Box>
   <Text >OrderId: {orders._id}</Text>
    <Text>User id:{orders.userID}</Text>
    <Text w='250px' textOverflow={'clip'} textTransform={'lowercase'} whiteSpace={'nowrap'} overflow={'hidden'}><span
    style={{textTransform:"capitalize"}}>Name:</span> {orders.product.name}</Text>
    <Text textTransform={'lowercase'}><span
    style={{textTransform:"capitalize"}}>Category:</span>{orders.product.category}</Text>
    <Text textTransform={'lowercase'}><span
    style={{textTransform:"capitalize"}}>Price:</span>{orders.product.price}</Text>
    <Text>Quanity: {orders.quantity}</Text>
   </Box>
    </Box>
  )
}
