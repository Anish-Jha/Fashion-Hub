import { Box, Button, Checkbox, Heading, Input, TagLabel, Text, useToast } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const toast=useToast();
  const navigate=useNavigate();
  const [cvv, setCvv] = useState('');
  const [card, setCard] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cartData, setDartData] = useState([])
    useEffect(() => {
        const cartquantity = JSON.parse(localStorage.getItem("cart")) || []
        setDartData(cartquantity)
    }, [])

    let t = cartData.reduce((acc, el) => {
        return acc + (el.quantity * el.price)
    }, 0)


  const handleSubmit=()=>{
    if(cvv==="" || card==="" || name==="" || address==="" || city===""){
      toast({
        title: 'fields empty',
        description: "All input fields are neccessary to be filled",
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }else{
        toast({
          title: 'Payment Successfull',
          description: "Your items will be delivered shortly",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate("/", { replace: true });
        localStorage.removeItem("cart");
      }
  }

  return (
    <Box justifyContent={'center'} w='90%' m='auto' p='10px' mb='80px' borderRadius={'10px'} 
    boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
      <Box textAlign={'left'} p='10px'>
        <Heading fontSize={'24px'}>Please provide your address</Heading>
        <Box>
          <Box display={'flex'} gap={'10px'}>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} id='address' w='500px' border={'1px solid grey'} mt='15px' bgColor={'white'} focusBorderColor='black' placeholder='Address/locality' />
          <Input value={city} onChange={(e) => setCity(e.target.value)} w='300px' border={'1px solid grey'} mt='15px' bgColor={'white'} focusBorderColor='black' placeholder='City' />
          </Box>
          <Box display={'flex'} gap={'10px'}>
          <Input w='500px' border={'1px solid grey'} mt='15px' bgColor={'white'} focusBorderColor='black' placeholder='Landmark'/>
          <Input w='300px' border={'1px solid grey'} mt='15px' bgColor={'white'} focusBorderColor='black' placeholder='Alternate mobile no.'/>
          </Box>
          <Box display={'flex'} mt='10px' gap={'5px'}>
          <Checkbox borderColor={'black'}/><Text>Mark it as your permanent adress</Text>
          </Box>

        </Box>
      </Box>


      <Box textAlign={'left'} mt='20px'>
      <Box>

        <Box p='10px' mt='15px'>
          <Button variant={'unstyled'}>Payment Details</Button>
          <Box display={'flex'} justifyContent={'space-between'} w='70%'>
            <Box>
              <Text fontWeight={"600"}>Summary</Text>
              <Text fontWeight={"600"}>Total products: {cartData.length}</Text>
              <Text fontWeight={"600"}>Total amount:  Rs. {t}</Text>
              <Text fontWeight={"600"}>Delivery: Free</Text>
            </Box>
            <Box>
              <Input id='card'  value={card} onChange={(e) => setCard(e.target.value)} w='500px' bgColor={'white'} mt='10px' border={'1px solid grey'} focusBorderColor='black' placeholder='Card Number'/>
              <Box display={'flex'} gap={'10px'}>
              <Input type='month' mt='10px' bgColor={'white'} border={'1px solid grey'} focusBorderColor='black'
              min="2023-04" />
              <Input id='cvv'  value={cvv} onChange={(e) => setCvv(e.target.value)} mt='10px' bgColor={'white'} border={'1px solid grey'} focusBorderColor='black' placeholder='CVV'/>
              </Box>
              <Input id='name'  value={name} onChange={(e) => setName(e.target.value)} mt='10px' bgColor={'white'} border={'1px solid grey'} focusBorderColor='black' placeholder='Name on the Card'/>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
      <Button onClick={handleSubmit} m='auto' w='200px' mt='15px' bgColor={'lightskyblue'}>Proceed to pay</Button>
    </Box>
  )
}
