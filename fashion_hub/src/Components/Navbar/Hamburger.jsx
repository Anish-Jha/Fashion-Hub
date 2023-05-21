import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import {
  Box,
  Heading,
  Input,
  IconButton,
  useToast,
  Tooltip,
  Flex,
  Container,
  Menu,
  MenuItem,
  useDisclosure,
  MenuButton,
  Button,
  MenuList,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Popover,
  PopoverCloseButton,
  PopoverArrow,
  Text,
} from "@chakra-ui/react";
import { BsPerson, BsSearch } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { getProduct } from "../../Redux/ProductRedux/action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { logout } from "../../Redux/AuthRedux/action";
import { useDispatch, useSelector } from "react-redux";
import MiniCard from "../Product/miniCard";

const HamburgerMenu = () => {
  const [user, setUser] = useState(<AiOutlineLogin />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();
  const navigateTo = useNavigate();
  const toast = useToast();
  const toggleMenu = () => {
    isOpen ? onClose() : onOpen();
  };
  const GoTo = (path) => {
    console.log("path", path);
    navigateTo(path);
  };

  const products = useSelector((store) => {
    return store.product.product;
  });

  const dispatch = useDispatch();
  const handleLogout = () => {
    toast({
      description: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setUser(<AiOutlineLogin />);
    dispatch(logout());
  };

  const debouncedGetProduct = debounce((searchQuery) => {
    let obj = {
      params: {
        q: searchQuery,
      },
    };
    dispatch(getProduct(obj));
  }, 300);


  const handleSearch = (event) => {
    GoTo("/cart");
  };

  const profile = JSON.parse(localStorage.getItem("user"));
  const handlePersonClick = () => {
    if (isLoggedIn) {
      setUser(<BsPerson />);
    } else {
      setUser(<AiOutlineLogin />);
      GoTo("/SignIn");
    }
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  useEffect(() => {
    debouncedGetProduct(searchQuery);
    if (isLoggedIn) {
      setUser(<BsPerson />);
    } else {
      setUser(<AiOutlineLogin />);
    }
  }, [searchQuery, isLoggedIn]);

  return (
    <>
      <Flex
        id="hamNav"
        justify={"space-between"}
        bgColor="#ffffff"
        mb="15px"
        position={"sticky"}
        top="0"
        zIndex={"5"}
      >
        <IconButton
          aria-label="Open Menu"
          bgColor={"#ffffff"}
          size="lg"
          icon={<HamburgerIcon />}
          onClick={toggleMenu}
          display={'block'}
        />

        <Box>
              <Input
                type="text"
                w='200px'
                value={searchQuery}
                m='auto'
                h='30px'
                mt='5px'
                focusBorderColor="none"
                outline={'1px solid grey'}
                border={'none'}
                placeholder="Enter search query"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            <Box
              w="300px"
              position={"absolute"}
              bgColor={"#ffffff"}
              maxHeight={"400px"}
              overflowY={"scroll"}
            >
              {searchQuery !== "" && (
                <div>
                  {products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((element) => (
                      <MiniCard key={element.id} product={element} />
                    ))}
                  {products.length === 0 && <div>No matches found.</div>}
                </div>
              )}
            </Box>
          </Box>
        
        <Button
          variant={"unstyled"}
          fontSize={"22px"}
          onClick={handleSearch}
        >
          <BiShoppingBag />
        </Button>

        <Box>
          {!isLoggedIn && (
            <Button
              variant={"unstyled"}
              fontSize={"24px"}
              fontWeight={"500"}
              onClick={handlePersonClick}
            >
              {user}
            </Button>
          )}
          {isLoggedIn && (
            <Popover isOpen={showOptions} hasArrow>
              <PopoverTrigger>
                  <Button
                    onClick={handlePersonClick}
                    variant="unstyled"
                    fontSize="24px"
                    fontWeight="500"
                  >
                    {user}
                  </Button>
              </PopoverTrigger>
              <PopoverContent
                w="max-content"
                position={"absolute"}
                mt="-10px"
                top="0px"
                right={"0px"}
              >
                <PopoverBody>
                  <Box>
                    <Text>
                      {" "}
                      {profile && (
                        <Box textAlign={"left"}>
                          <Text>Hi {profile.name}</Text>
                          <Text>{profile.email}</Text>
                          <Link to={'/getorders'}>
                                  <Text>Orders</Text>
                          </Link>
                        </Box>
                      )}
                    </Text>
                  </Box>
                  <Tooltip label="Logout" placement="bottom" hasArrow>
                    <Button variant="unstyled" onClick={handleLogout}>
                      <FaSignOutAlt />
                    </Button>
                  </Tooltip>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Box>
      </Flex>

      <Box
        bg="#ffffff"
        px={2}
        py={4}
        pos="fixed"
        top={0}
        left={0}
        w={["100%",'25%','20%',"15%"]}
        h="auto"
        zIndex={20}
        display={{ base: isOpen ? "block" : "none", md: isOpen ? "block" : "none"}}
      >
        <Flex justify="space-between" textAlign={"left"} mb={4}>
          <Stack spacing={3} textAlign={"left"} p="10px" fontWeight={'600'}>
            <Text>Menu</Text>
            <Link to="/">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Home
              </Text>
            </Link>
            <Link to="/product">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Men
              </Text>
            </Link>
            <Link to="/product">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Women
              </Text>
            </Link>
            <Link to="/product">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Kids
              </Text>
            </Link>

            <Link to="/product">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Shoes
              </Text>
            </Link>

            <Link to="/product">
              <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
                Casuals
              </Text>
            </Link>

            <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
              About Us
            </Text>

            <Text fontFamily={"Open Sans,Sans-Serif"} onClick={onClose}>
              Contact Us
            </Text>
          </Stack>

          <IconButton
            aria-label="Close Menu"
            bgColor={'gray.200'}
            borderRadius={'50%'}
            size="md"
            icon={<CloseIcon />}
            onClick={onClose}
          />
        </Flex>
      </Box>
    </>
  );
};

export default HamburgerMenu;
