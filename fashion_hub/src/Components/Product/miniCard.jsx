import React from 'react'
import { Link } from 'react-router-dom'
export default function MiniCard({product}) {
  return (
    <div style={{display:"flex",width:"280px",height:"auto",overflow:"hidden",textAlign:"left",margin:"auto",marginTop:"10px",gap:"5px",padding:"5px"}}>
      <Link to={`/product/${product._id}`}>
      <img style={{width:"70px", height:"90px",borderRadius:"10px"}} src={product.image} alt={product.name}/>
      </Link>
      <p style={{fontFamily:"Helvetica", fontSize:"12px", color:"#000000",lineHeight:"21px",paddingBottom:"5px",marginTop:"20px",
       whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</p>
    </div>
  )
}
