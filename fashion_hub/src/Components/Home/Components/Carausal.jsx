import React, { useRef, useState } from "react";
// Import Swiper React components
import {Swiper }from "swiper/react";
import {SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Pagination } from "swiper";
import { Box, Image, Text } from "@chakra-ui/react";
const product=[{
    image: "https://cdn.shopify.com/s/files/1/0677/1464/6315/files/ball_sweatshirt-01.jpg?v=1668170499&width=360",
    name: "Swetshirts",
    price: "790.00",
    description: "HYR - Essentials by Koovs products are made using the most premium fabrics and trims....",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0677/1464/6315/files/unisex_accessories-01.jpg?v=1668170734&width=360",
    subhead: "Essentials By Koovs",
    name: "Accessories",
    price: "790.00",
    description: "HYR - Essentials by Koovs products are made using the most premium fabrics and trims....",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Untitled-6-01.jpg?v=1667985899&width=360",
    name: "T-Shirts",
    price: "790.00",
    description: "HYR - Essentials by Koovs products are made using the most premium fabrics and trims...."
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0677/1464/6315/files/KOOVS_20OCT22-1025.jpg?v=1667897521&width=360",
    name: "Kackets",
    price: "790.00",
    description: "HYR - Essentials by Koovs products are made using the most premium fabrics and trims....",
  }]
export default function Carausal() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {product.map((e)=>(
                    <SwiperSlide>
                    <Image src={e.image}/>
                    <Text>{e.name}</Text>
                    </SwiperSlide>
                ))}
      </Swiper>
    </>
  );
}
