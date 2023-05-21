import {
  Box,
  Text,
  extendTheme,
  Button,
  Image,
  Heading,
  Input,
  Checkbox,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import CartCard from "./CartCard";
import { BsPencil } from "react-icons/bs";
import cart from './cart.png'
import { FaShippingFast } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";
import { emptyCart, getCart, updateCart } from "../Redux/cartRedux/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import pay from "./successgif.gif";

function Cart() {
  const [total, setTotal] = useState(0);
  const [validate, setValidate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const navigate = useNavigate();
  const [cvv, setCvv] = useState("");
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(true);
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('text');

  const handleFocus = () => {
    setInputType('month');
  };

  const handleButtonClick = () => {
    navigate("/");
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
      dispatch(emptyCart());
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

  const cartData = useSelector((store) => {
    return store.cartReducer.items;
  });

  useEffect(() => {
    calculateTotalPrice();
    validateCart();
  }, [cartData]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    setTotal(totalPrice);
  };

  const validateCart = () => {
    if (cartData.length > 0) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <Box
        display={["block", "block", "block", "flex", "flex"]}
        w="95%"
        justifyContent={"space-between"}
        m="auto"
        mb="50px"
      >
        <Box mt="30px" w={["100%", "100%", "80%", "70%", "70%"]}>
          {cartData.length > 0 ? (
            cartData.map((e) => (
              <CartCard
                key={e.id}
                data={e}
                calculateTotalPrice={calculateTotalPrice}
              />
            ))
          ) : (
            <Box
              m="auto"
              w="auto"
              mt="50px"
              textAlign={"left"}
              p="20px"
              borderRadius={"10px"}
            > 
             <Image m='auto' src={cart}/>
              <Heading fontFamily={'Popins,Sans-Serif'}>Please add some products in the cart :{"("}</Heading>
            </Box>
          )}
        </Box>
        <Box
          mt="50px"
          w={["90%", "40%", "35%", "25%", "25%", "25%"]}
          bgColor={"#faf5f5"}
          borderRadius={"10px"}
          h="250px"
          p="10px"
        >
          <Box
            display="flex"
            borderBottom="1px solid gray"
            justifyContent="space-between"
          >
            <Box>
              <BsPencil size="30px" />
              <Text>Note</Text>
            </Box>
            <Box>
              <FaShippingFast size="30px" />
              <Text>Shipping</Text>
            </Box>
            <Box>
              <RiCouponLine size="30px" />
              <Text>Coupon</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box>Shipping</Box>
            <Box>:FREE</Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box>coupon</Box>

            <Box fontWeight="">:Not Applicable</Box>
          </Box>

          <Box onClick={validateCart}>
            <Button
              w="100%"
              bg="lightgrey"
              color="black"
              display="flex"
              justifyContent="space-between"
              borderRadius="0"
              mt="30px"
            >
              <Box>
                <Button
                  onClick={validate ? onOpen : undefined}
                  variant={"unstyled"}
                  display={"flex"}
                  width={"max-content"}
                >
                  <Text fontSize={["10px", "11px", "13px"]}>Place Order</Text>
                  <Text fontSize={["10px", "11px", "13px"]}>
                    5% Extra off on UPI
                  </Text>
                  <Box>
                    <Image src="https://cdn.gokwik.co/v4/images/upi-icons.svg" />
                  </Box>
                  <Box>
                    <FiChevronRight />
                  </Box>
                </Button>
              </Box>
            </Button>
          </Box>
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
                    <Text>Total products: {cartData.length}</Text>
                    <Text>Total amount: Rs. {total}</Text>
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
export default Cart;
