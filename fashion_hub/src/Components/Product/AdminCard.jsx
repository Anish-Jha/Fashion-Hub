import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../Redux/ProductRedux/action';
import {Button} from '@chakra-ui/react'
import {TbEdit} from 'react-icons/tb'
import {RiDeleteBin6Line} from 'react-icons/ri'

export default function AdminCard({product,onDelete}) {
  const id=product._id
    const dispatch=useDispatch();
    const handleDelete=()=>{
        dispatch(removeProduct(id));
    };

  return (
    <div style={{width:"200px",height:"380px",overflow:"hidden",textAlign:"left", backgroundColor:"#fdf7ee",borderRadius:"10px",
    padding:"10px",margin:"auto",boxShadow:' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
      <img style={{width:"190px", height:"240px",margin:"auto"}} src={product.image} alt={product.name}/>
      <small style={{fontSize:"11px", color:"grey"}}>{product.subhead}</small>
      <p style={{fontFamily:"Helvetica", fontWeight:"600", fontSize:"12px", color:"#000000",lineHeight:"21px",paddingBottom:"5px",
       whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</p>
      <p style={{fontWeight:"400", fontSize:"14px", color:"#000000",lineHeight:"21px",paddingBottom:"5px"}}>Rs. {product.price}</p>
      <Link to={`/product/${product._id}/edit`}>
        <Button bgColor={'lightgreen'}><TbEdit/></Button>
      </Link>
      <Button
        colorScheme='red'
        ml='10px'
        onClick={handleDelete}
       >
       <RiDeleteBin6Line/>
      </Button>
    </div>
  )
}
