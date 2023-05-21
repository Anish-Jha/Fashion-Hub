import {Button, Heading, useDisclosure,Drawer,
  DrawerBody,DrawerCloseButton ,DrawerContent,DrawerOverlay,
  DrawerHeader, FormLabel, Checkbox, Select,RangeSlider,RangeSliderFilledTrack,
  RangeSliderTrack,RangeSliderThumb, Input} from '@chakra-ui/react';
import choose from './image/pallate.png'
import {BiChevronDown} from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const Filter = () => {
    const {isOpen, onOpen, onClose}=useDisclosure()
    const [searchParams, setSearchParams]=useSearchParams();
    const initialState=searchParams.getAll("category");
    const [category,setCategory]=useState(initialState || []);
    const initialorder=searchParams.getAll("order");
    const [order,setOrder]=useState(initialorder || '');
    const btnRef = React.useRef()

    const handleChange=(e)=>{
        let newCategory=[...category];
        let value=e.target.value;
        if(newCategory.includes(value)){
            newCategory.splice(newCategory.indexOf(value),1)
        }else{
            newCategory.push(value);
        }
        setCategory(newCategory);
    }
    
    const handleSort=(e)=>{
      setOrder(e.target.value);
    }

    const handleVisible=()=>{
      let silde=document.getElementById("slide");
      if(silde.style.visibility=="visible"){
        silde.style.visibility="hidden";
        silde.style.display="none";
      }else if(silde.style.visibility=="hidden"){
        silde.style.visibility="visible";
        silde.style.display="block";
      }
    }
    
    useEffect(()=>{
      let params={
        category,
      }
      order && (params.order=order);
      setSearchParams(params);
    },[category,order])

  return (
   <div style={{display:"flex"}}>
   <Button onClick={onOpen} bg='none' fontSize='14px' variant='unstyled' display='flex'>Filter<BiChevronDown/></Button>
   <Drawer size={'sm'} isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
   <DrawerOverlay/>
    <DrawerContent >
    <DrawerHeader  fontSize={'26px'}>Filters</DrawerHeader>
    <DrawerCloseButton />
    <DrawerBody >
      <div>
      <Button onClick={handleVisible} width="100%" fontSize='14px' bg='none' variant='unstyled' gap="85%" display='flex' color={'#000000'}>Price <BiChevronDown/> </Button>
      <div id="slide" style={{visibility:'visible',margin:"20px 0px 20px 0px"}}>
      <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 100]} colorScheme='blackAlpha'>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
            </RangeSliderTrack>
          <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <div style={{display:"flex", gap:"10px",margin:"20px 0px 20px 0px"}}>
        <Input placeholder='₹'/><span style={{textAlign:"center", paddingTop:"10px"}}>To</span><Input placeholder='₹'/>
      </div>
      </div>
      </div>
      <Button width="100%" bg='none' variant='unstyled' fontSize='14px' gap='73%' display='flex' color={'#000000'}>Product Type <BiChevronDown/> </Button>
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Shirt" onChange={handleChange} checked={category.includes("Shirt")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Shirt</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Hoodie" onChange={handleChange} checked={category.includes("Hoodie")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Hoodie</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Joggers" onChange={handleChange} checked={category.includes("Joggers")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Joggers</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Jackets" onChange={handleChange} checked={category.includes("Jackets")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Jackets</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="sweatshirts" onChange={handleChange} checked={category.includes("sweatshirts")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Sweatshirts</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Shoes" onChange={handleChange} checked={category.includes("Shoes")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Shoes</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="outwears" onChange={handleChange} checked={category.includes("outwears")}/> 
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Outwears</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="Pants" onChange={handleChange} checked={category.includes("Pants")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Pants</FormLabel>
      </div>
      
      
      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox value="T-Shirt" onChange={handleChange} checked={category.includes("T-Shirt")}/>
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>T-Shirt</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Sandals</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Shorts</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Slides</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Bags</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Joggers</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Coats</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Hats</FormLabel>
      </div>

      <div style={{display:"flex", gap:"10px"}}>
        <Checkbox />
        <FormLabel color={'#000000'} fontWeight='400' paddingTop='8px'>Sneakers</FormLabel>
      </div>

      <div style={{display:"flex", fontWeight:"600", gap:"85%", margin:"30px 0px 30px 0px", cursor:"pointer"}}>
        <p>Size</p>
        <BiChevronDown/>
      </div>

      <div style={{display:"flex",fontWeight:"600", gap:"81%", margin:"30px 0px 30px 0px", cursor:"pointer"}}>
        <p>Brand</p>
        <BiChevronDown/>
      </div>

      <div style={{display:"flex",fontWeight:"600", gap:"71%", margin:"30px 0px 30px 0px", cursor:"pointer"}}>
        <p>Availability</p>
        <BiChevronDown/>
      </div>

      <div style={{display:"flex",fontWeight:"600", gap:"78%", margin:"30px 0px 30px 0px", cursor:"pointer"}}>
        <p>Gender</p>
        <BiChevronDown/>
      </div>

      <div style={{cursor:"pointer"}}>
        <p style={{fontWeight:"600"}}>
          Color
        </p>
       <img src={choose} alt="" />
      </div>
    </DrawerBody>
    </DrawerContent>
    </Drawer>
    <div style={{padding:"8px", outline:"none", marginLeft:"7px", cursor:"pointer",border:"none"}}>
      <Select onChange={handleSort} variant='unstyled' fontSize='14px' fontWeight={600} outline='none' border={"none"} cursor={'pointer'}>
        <option style={{cursor:"pointer", fontWeight:'600'}}  name='order' value={''} outline='none'>Best Selling</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  name='order' value={'asc'} outline='none'>Price, Low to High</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  name='order' value={'desc'} outline='none'>Price, High to Low</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  value="">Alphabetically, A-Z</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  value="">Alphabetically, Z-A</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  value="">Date,Old to New</option>
        <option style={{cursor:"pointer", fontWeight:'600'}}  value="">Date,New to Old</option>
      </Select>
    </div>
    </div>
  )
}

export default Filter;


