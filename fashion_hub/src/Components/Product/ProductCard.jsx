import React from 'react'
import { Link } from 'react-router-dom'
import color from './image/color.png'
export default function ProductCard({product}) {
  return (
    <div style={{width:"315px",height:"529px",overflow:"hidden",textAlign:"left",
    padding:"10px",margin:"auto",}}>
      <Link to={`/product/${product.id}`}>
      <img style={{width:"295px", height:"395px",margin:"auto"}} src={product.image} alt={product.name}/>
      </Link>
      <small style={{fontSize:"11px", color:"grey"}}>{product.subhead}</small>
      <p style={{fontFamily:"Helvetica", fontWeight:"600", fontSize:"12px", color:"#000000",lineHeight:"21px",paddingBottom:"5px",
       whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</p>
      <p style={{fontWeight:"400", fontSize:"14px", color:"#000000",lineHeight:"21px",paddingBottom:"5px"}}>Rs. {product.price}</p>
      <img style={{cursor:"pointer"}} src={color} alt="" />
    </div>
  )
}
