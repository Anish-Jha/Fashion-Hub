import { Input,Button, TagLabel,FormLabel, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct,getProduct } from "../Redux/ProductRedux/action";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [subhead,setSubhead]=useState("");
  const [image,setImage]=useState("");

  const products = useSelector((store) => {
    return store.product.product;
  });
  const dispatch = useDispatch();

  useEffect(() =>{
    const productData = products && products.find((el) => el.id===+id)
    if (productData) {
        setName(productData.name);
        setPrice(productData.price);
        setSubhead(productData.subhead)
        setImage(productData.image);
    }
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    let newData = {
      image,
      price,
      name,
      subhead
    };
    setName("");
    setPrice("");
    setSubhead("");
    setImage("");

    dispatch(editProduct(id, newData)).then(() => dispatch(getProduct()));
  };

  return (
    <div style={{width:"50%",margin:"auto",padding:"20px",marginTop:"40px",marginBottom:"100px"}}>
      <Heading padding={'20px'}>Edit Product Id: {id}</Heading>
      <div style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',padding:"20px",borderRadius:"5px",backgroundColor:"whitesmoke"}}>
        <FormLabel>Image</FormLabel>
        <Input type="url" value={image} onChange={(e) => setImage(e.target.value)}/>
        <FormLabel>Subhead</FormLabel>
        <Input type="text" value={subhead} onChange={(e) => setSubhead(e.target.value)}/>
        <FormLabel>name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <FormLabel>price</FormLabel>
        <Input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <Button margin={'10px'} onClick={handleEdit}>Submit</Button>
      </div>
    </div>
  );
};
export default Edit;