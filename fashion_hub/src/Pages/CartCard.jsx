import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {RiDeleteBin6Line} from 'react-icons/ri'
import { getCart, removeCart, updateCart } from "../Redux/cartRedux/action";
import { useDispatch, useSelector } from "react-redux";

function CartCard({data,calculateTotalPrice}){
   
    const id=data._id
    const dispatch=useDispatch();
    const handleDelete=()=>{
        dispatch(removeCart(id));
    };
    
    const [quantity, setQuantity] = useState(data.quantity);
    
    const handleIncrement = () => {
        calculateTotalPrice();
        setQuantity(quantity + 1);
        dispatch(updateCart(id, quantity + 1));
    };
    
    const handleDecrement = () => {
        if (quantity>1) {
            setQuantity(quantity - 1);
            dispatch(updateCart(id, quantity - 1));
            calculateTotalPrice();
          }
    }

    useEffect(()=>{
        dispatch(getCart())
    },[dispatch])

    return(
        <Box display={["","flex","flex","flex","flex","flex"]} p='10px' w='100%' mt='20px' bgColor={'#faf5f5'} justifyContent={'space-between'} borderRadius={'10px'} fontFamily="sans-serif" alignContent="center" alignItems="center">
                <Box w={["100%","70%","60%","55%","55%","50%"]} bgColor={'#ececec'} borderRadius={'10px'}>
                    <Box display="flex" gap="10px">
                        <Box w={["30%","30%","40%","90%","95%","90%"]}>
                        <Image w='100px' borderRadius={'10px'} src={data.product.image}/>
                        </Box>
                        <Box  w={["70%","60%","60%","90%","95%","90%"]} padding={'20px'}>
                            <Text fontWeight={'600'} fontSize={'16px'} textAlign={'left'}>{data.product.name}</Text>
                            <Text fontWeight={'600'} fontSize={'13px'} textAlign={'left'}>{data.product.subhead}</Text>
                           <Box display={'flex'} justifyContent={'space-between'}>
                           <Text mt='10px' fontWeight={'600'} fontSize={'16px'} textAlign={'left'}>Price: ₹ {data.product.price}</Text>
                            <Button variant={'unstyled'} pt={'5px'} fontSize={'18px'} onClick={handleDelete}><RiDeleteBin6Line/></Button>
                           </Box>
                            
                        </Box>
                    </Box>
                </Box>

                <Box w="max-content" display={'flex'} gap={'60px'}>
                    <Box>
                    <Text fontWeight="bold">Quantity</Text>
                    <Box bgColor={'#ececec'} display="flex" borderRadius={'5px'}>
                        <Button bg="none" onClick={handleIncrement}>+</Button>
                        <Text  m="auto">{quantity}</Text>
                        <Button bg="none" onClick={handleDecrement}>-</Button>
                    </Box>
                    </Box>
                     <Box mr='10px' fontWeight="bold" mt='20px'>
                    <Text>Total: ₹ {quantity*data.product.price}</Text>
                    </Box>
                </Box>
        </Box>
        
    )
}
export default CartCard;