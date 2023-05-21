import { Button,FormControl,FormLabel,Input,Heading} from '@chakra-ui/react'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../Redux/ProductRedux/action'

let initialState={
    image:"",
    subhead:"",
    name:"",
    price:Number,
    discount:"",
    category:"",
}
const Admin=()=>{
  const [product, setproduct]=useState(initialState);
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setproduct((prev)=>{
        return {...prev,[name]:name==="price"?+value : value};
    })
    console.log(e.target.value);
    console.log(e.target.name);
  }
  const handleSubmit=(e)=>{
     e.preventDefault();
     dispatch(addProduct(product));
     setproduct(initialState);
  }

  return (
    <div>
      <Wrapper>
       <form onSubmit={(e)=>{
        handleSubmit(e);
       }}>
       <FormControl bgColor={'whitesmoke'} boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'} padding={'20px'} borderRadius={'5px'}>
            <Heading>Add Product</Heading>
            <FormLabel>Image</FormLabel>
            <Input type="url" name='image' value={product.image} onChange={(e)=>handleChange(e)}/>
            <FormLabel>subhead</FormLabel>
            <Input type="text" name='subhead' value={product.subhead} onChange={(e)=>handleChange(e)}/>
            <FormLabel>name</FormLabel>
            <Input type="text" name='name' value={product.name} onChange={(e)=>handleChange(e)}/>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" value={product.price} onChange={(e)=>handleChange(e)}/>
            <FormLabel>Category</FormLabel>
            <Input type="text" name="category" value={product.category} onChange={(e)=>handleChange(e)}/>
            <FormLabel>discount</FormLabel>
            <Input type="number" name="discount" value={product.discount} onChange={(e)=>handleChange(e)}/>
            <Button bgColor={'goldenrod'} margin={'10px'} type='submit'>Add Product</Button>
        </FormControl>
       </form>
      </Wrapper>
    </div>
  )
}

export default Admin

const Wrapper=styled.div`
padding:40px;
width:50%;
margin:auto;`