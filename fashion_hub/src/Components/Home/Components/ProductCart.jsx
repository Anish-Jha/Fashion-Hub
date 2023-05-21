import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { extendTheme } from '@chakra-ui/react'
import {Link as RouterLink} from "react-router-dom"
const breackpoints = {
    base: "420px",
    sm: "550px",
    md: "700px",
    lg: "850px",
    xl: "950px",
    "2xl": "1200px"
}
const theme = extendTheme({ breackpoints })

function ProductCart({ image, image2, price, title }) {
    const [over, setOver] = useState(false);
    return (
        <RouterLink to="/product">
        <Box m="auto" className="productCart" onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)}>
            <Box h={['220px','250px','300px','380px','400px']} verticalAlign={'middle'} display={'flex'} flexDirection={'column'}>
            <Image m='auto' w='auto' h='auto' src={over? image2:image} onError={(e)=>{
             e.target.src = "https://i.pinimg.com/originals/6d/22/8f/6d228f5ca80215c24f9b6f4e30f2ece7.webp";
             e.target.alt = "Alternative Image";
             }}/>
            </Box>
            <Text  fontFamily="SF-body-font" fontWeight="bold" fontSize={["12px","15px","16px","16px","18px","18px"]}>{title}</Text>
            <Text fontSize={["10px","13px","14px","14px","16px","16px"]}>{price}</Text>
            </Box>
            </RouterLink>
    )
}
export default ProductCart;