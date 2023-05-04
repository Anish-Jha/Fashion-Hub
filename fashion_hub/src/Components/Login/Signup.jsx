import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {Navigate, Link as RouterLink} from "react-router-dom"
import {
  Box,Flex,
  Button,HStack,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link, Text,
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { register } from "../../Redux/AuthRedux/action";
import { REGISTER_FAILURE, REGISTER_SUCCESS } from "../../Redux/AuthRedux/actionTypes";

function reducer(state, action) {

  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };

    case "password":
      return {
        ...state,
        password: action.payload,
      };

    case "phone":
      return {
        ...state,
        phone: action.payload,
      };
    default:
      return state;
  }
}

const initialState = {
  name: "",
  email: "",
  password: "",
  phone:""
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setter] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast()
  const signupHandler = () => {
    dispatch(register(state)).then((r) => {
      if(state.name==="" || state.email==="" || state.password==="" || state.phone===""){
        toast({
          title: 'invalid credentials',
          description: "Please fill all neccessary fields!",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      else if (r === REGISTER_SUCCESS) {
          toast({
            title: 'Account created.',
            description: "Your account has been successfully created",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        navigate("/signin", { replace: true });
      }else if (r === REGISTER_FAILURE) {
        toast({
          description: "Please enter credentials",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    });
  };

  return (
<Flex
      minH={"100vh"}
      // mt='-80px'
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            🙏Fashion Hub Team welcomes you🙏
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          bgColor="#f0f1f7 "
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    focusBorderColor="#353535"
                    border={'1px solid black'}
                    errorBorderColor="red.300"
                    type="text"
                    size="lg"
                    value={state.name}
                    onChange={(e) =>
                    setter({ type: "name", payload: e.target.value })}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                  size="lg"
                  border={'1px solid black'}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                focusBorderColor="black"
                border={'1px solid black'}
                errorBorderColor="red.300"
                type="email"
                value={state.email}
                onChange={(e) =>
                  setter({ type: "email", payload: e.target.value })
                }
                size="lg"
              />
            </FormControl>
            <FormControl id="Contact" isRequired>
              <FormLabel>Mobile No</FormLabel>
              <Input
              focusBorderColor="#353535"
              border={'1px solid black'}
              errorBorderColor="red.300"
              type="text"
              size="lg"
              value={state.phone}
              onChange={(e) =>
              setter({ type: "phone", payload: e.target.value })}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  size="lg"
                  border={'1px solid black'}
                  focusBorderColor="black"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) =>
                    setter({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={signupHandler}
              >
                Sign Up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <RouterLink to="/signin">
                <Link color={"blue.400"} onClick={() => <Navigate to={'/signin'}/>}>
                  SignIn
                </Link>
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
};

export default SignUp;


