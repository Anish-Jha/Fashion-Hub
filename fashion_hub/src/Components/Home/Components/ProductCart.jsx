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

function ProductCart({ image, image2, description, price, title }) {
    const [over, setOver] = useState(false);
    return (
        <RouterLink to="/product">
        <Box m="auto" className="productCart" onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}>
            <Image src={over? image2:image}/>
            <Text  fontFamily="SF-body-font" fontWeight="bold" fontSize={["12px","15px","16px","16px","18px","18px"]}>{title}</Text>
            <Text fontSize={["10px","13px","14px","14px","16px","16px"]}>{price}</Text>
            </Box>
            </RouterLink>
    )
}
export default ProductCart;