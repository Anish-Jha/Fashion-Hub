import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {IoIosArrowForward} from 'react-icons/io'
import{FaEye} from 'react-icons/fa'
import size from '../Components/Product/image/size.png'
import {RiSubtractFill} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import pay from "./successgif.gif";
import {BsShare} from 'react-icons/bs'
import {BsQuestionCircle,BsStar} from 'react-icons/bs'
import { addToCart, emptyCart } from "../Redux/cartRedux/action";
import { Box, Button,Input, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


export default function SingleProduct() {
  const [count, setCount] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [cvv, setCvv] = useState("");
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(true);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('text');

  const handleFocus = () => {
    setInputType('month');
  };

  const { id } = useParams();
  const products = useSelector((store) => {
    return store.product.product;
  });

  const [data, setData] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  
  const productData = products && products.find((el) => el._id===id)
  useEffect(() => {
    if(productData){
      setData(productData);
    }
  }, []);

  const handleButtonClick = () => {
    navigate("/product");
  };
  const handleSubmit = () => {
    if (
      cvv === "" ||
      card === "" ||
      name === "" ||
      address === "" ||
      city === ""
    ) {
      toast({
        title: "fields empty",
        description: "All input fields are neccessary to be filled",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else if (card.length !== 16) {
      toast({
        title: "card length should be 16 characters",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else if (cvv.length !== 3) {
      toast({
        title: "cvv length should be 3 characters",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Payment Successfull",
        description: "Your items will be delivered shortly",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setPaymentComplete(false);
    }
  };

  const handleIncrement = () => {
    setCount((prevQuantity) => prevQuantity + 1);
    console.log(count)
  }

  const handleDecrement = () => {
    setCount((prevQuantity) => prevQuantity - 1);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    const payload = {
      product_id: id,
      product: productData,
      quantity: count,
    };
    console.log(payload);
    dispatch(addToCart(payload));
    setAddedToCart(true);
  };

  const n=Math.ceil(Math.random()*6);
  
  return (
    <>
    <Box display={'flex'} w='100%' m='auto' justifyContent={'center'}>
        <Text fontSize={['10px','10px','14px','16px','16px']}><Link to='/'>Home</Link></Text>
        <Text fontSize={['10px','10px','14px','16px','16px']} mt='3px'><IoIosArrowForward/></Text>
        <Text fontSize={['10px','10px','14px','16px','16px']}><Link to='/product'>all men products</Link></Text>
        <Text fontSize={['10px','10px','14px','16px','16px']} mt='3px'><IoIosArrowForward/></Text>
        <Text fontSize={['10px','10px','14px','16px','16px']} textTransform={'lowercase'}>{data.name}</Text>
      </Box>

    <Box display={['block','block','flex','flex']} w={['100%','100%','80%',"80%"]} m='auto' gap='20px' mt='20px'>
     <Box>
     <Image m='auto' w={['300px','300px','350px','400px','500px']} src={data.image} alt="loading..." />
     </Box>

     <Box textAlign={'left'} p='10px' >
        <Box display={'flex'} textAlign='left' justifyContent={'space-between'}>
         <Text fontSize={['14px','14px','18px','24px','24px']}>
          {data.name}
         </Text>
         <Button display={['none','none','block','block','block']} float={'right'} fontSize={'24px'}variant={'unstyled'} padding={'6px'} m='5px'
         border={'1px solid black'} borderRadius={'50%'}><BsStar/>
         </Button>
         </Box>

         <Text fontSize={['16px','16px','18px','22px','22px']} fontWeight={'500'}>Rs. {data.price}</Text>
         <Text style={{color:"grey", fontSize:"14px", lineHeight:"21px"}}>Tax included.</Text>
         <Box style={{margin:"20px 0px 20px 0px"}}>
         <Text style={{color:"", fontSize:"14px", lineHeight:"21px",display:"inline-flex"}}><FaEye style={{margin:"2px 5px 0px 5px",fontSize:"18px"}}/> {n} people are viewing this right now</Text>
         </Box>
         
         <Text><Text style={{fontWeight:"600"}}>Size</Text>:M</Text>
         <img style={{cursor:"pointer", margin:"10px 0px 20px 0px"}} src={size} alt="" />
         <Box>
          <Text style={{fontWeight:'600', fontSize:"14px",margin:"30px 0px 15px 0px"}}>Quantity</Text>
          <Box display={['block','block','flex','flex']} gap='10px'>
            <Box style={{display:"flex", border:"1px solid grey"}} w='110px' mb='10px'>
               <Button variant={'unstyled'} padding={"10px"} isDisabled={count==1? true:false} onClick={handleDecrement}><RiSubtractFill/></Button>
                  <Text style={{ padding:"10px"}}>{count}</Text>
               <Button padding={"10px"} variant={'unstyled'} onClick={handleIncrement}><IoMdAdd/></Button>
            </Box>

            <Button width={['350px','350px','440px','440px']} variant={'unstyled'} border={'1px solid black'} height={'44px'} onClick={handleAddToCart}
             _hover={{backgroundColor:"black",color: "white"}}>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</Button>
          </Box>
       <Button onClick={isLoggedIn ? onOpen : undefined} width={['350px','400px','562px','562px']} variant={'unstyled'} border={'1px solid black'} height={'44px'} backgroundColor={'black'} color={'white'}
        _hover={{backgroundColor:"white",color: "black"}} margin='20px 0px 10px 0px'>BUY IT NOW</Button>
        </Box>
        <Box style={{display:"flex",marginTop:"50px", fontSize:"14px"}}>
        <BsQuestionCircle fontSize={'20px'}/>
        <Text style={{display:"flex",padding:'0px 10px 0px 10px'}}>Ask a question</Text>
        <BsShare fontSize={'15px'}/>
        <Text style={{display:"flex",padding:'0px 10px 3px 10px'}}>Share</Text>
        </Box>
        <Box width={['350px','400px','562px','562px']} borderTop='1px solid grey' mt='5px'></Box>
     </Box>
    </Box>
    <Box>

      <Box style={{borderBottom:".5px solid grey",display:"flex",justifyContent:"center",gap:"30px",width:"80%",margin:"auto",marginTop:"80px"}}>
        <Text style={{fontWeight:"700",borderBottom:"3px solid black"}}>Product description</Text>
        <Text style={{fontWeight:"700",color:"grey"}}>Shipping & Return</Text>
        <Text style={{fontWeight:"700",color:"grey"}}>Material & care</Text>
      </Box>
      <Box style={{textAlign:"left",width:"80%",margin:"auto",marginTop:"50px",color:'grey',marginBottom:"80px",lineHeight:"30px",
       fontSize:"14px"}}>
        <li>Relax Fit Tee</li>
        <li>Crew Neck</li>
        <li>Rib Finish at Neckline</li>
        <li>Brand Logo Print at the Centre Front</li>
        <li>Premium Quality Fabric</li>
        <li>Model wears size L and is 6'2</li>
      </Box>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={["90%", "", "", "", ""]}>
          <ModalHeader textAlign={"center"}>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paymentComplete ? (
              <Box
                maxW="600px"
                m="auto"
                p="20px"
                borderRadius="10px"
                bg="white"
              >
                <Text fontSize="24px" fontWeight="bold" mb="20px">
                  Delivery address
                </Text>
                <Box>
                  <Input
                    focusBorderColor="none"
                    _focus={{ bgColor: "whitesmoke" }}
                    outline={"none"}
                    border="none"
                    variant="filled"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    mb="10px"
                    placeholder="Address/locality"
                  />
                  <Input
                    focusBorderColor="none"
                    _focus={{ bgColor: "whitesmoke" }}
                    outline={"none"}
                    border="none"
                    variant="filled"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    mb="10px"
                    placeholder="City"
                  />
                  <Input
                    focusBorderColor="none"
                    _focus={{ bgColor: "whitesmoke" }}
                    outline={"none"}
                    border="none"
                    variant="filled"
                    mb="10px"
                    placeholder="Landmark"
                  />
                  <Input
                    focusBorderColor="none"
                    _focus={{ bgColor: "whitesmoke" }}
                    outline={"none"}
                    border="none"
                    variant="filled"
                    mb="10px"
                    placeholder="Alternate mobile no."
                  />
                </Box>

                <Box mt="30px">
                  <Text fontSize="18px" fontWeight="bold" mb="10px">
                    Payment Details
                  </Text>
                  <Box mb="10px">
                    <Text fontWeight="bold">Summary</Text>
                    <Text>Total amount: Rs. {data.price} </Text>
                    <Text>Delivery: Free</Text>
                  </Box>
                  <Box>
                    <Input
                      focusBorderColor="none"
                      _focus={{ bgColor: "whitesmoke" }}
                      outline={"none"}
                      border="none"
                      variant="filled"
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                      mb="10px"
                      placeholder="Card Number"
                    />
                    <Box display="flex" mb="10px">
                      <Input
                        focusBorderColor="none"
                        _focus={{ bgColor: "whitesmoke" }}
                        outline="none"
                        border="none"
                        onFocus={handleFocus}
                        type={inputType}
                        variant="filled"
                        mr="2"
                        mb="0"
                        placeholder="MM/YY"
                      />

                      <Input
                        focusBorderColor="none"
                        _focus={{ bgColor: "whitesmoke" }}
                        outline={"none"}
                        border="none"
                        variant="filled"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        mb="0"
                        placeholder="CVV"
                      />
                    </Box>
                    <Input
                      focusBorderColor="none"
                      _focus={{ bgColor: "whitesmoke" }}
                      outline={"none"}
                      border="none"
                      variant="filled"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      mb="10px"
                      placeholder="Name on the Card"
                    />
                  </Box>
                </Box>

                <Button
                  onClick={handleSubmit}
                  w="100%"
                  mt="30px"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                >
                  Proceed to Pay
                </Button>
              </Box>
            ) : (
              <Box textAlign={"center"}>
                <Image m="auto" src={pay} />
                <Button
                  colorScheme="blue"
                  m={"auto"}
                  mt="20px"
                  onClick={handleButtonClick}
                >
                  Continue Shopping
                </Button>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
