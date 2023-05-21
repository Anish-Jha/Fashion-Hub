import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { getProduct } from "../../Redux/ProductRedux/action";
import MiniCard from "../Product/miniCard";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  Input,
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
import { BiChevronDown } from "react-icons/bi";
import { FaFacebookF, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BsPerson, BsSearch, BsInstagram } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { logout } from "../../Redux/AuthRedux/action";
import "./Navbar.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import Mens_Image from "./images/Mens_image.webp";
import womens_Image from "./images/womens_image.webp";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(<AiOutlineLogin />);
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [data, setData] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const toast = useToast();
  const dispatch = useDispatch();

  const products = useSelector((store) => {
    return store.product.product;
  });

  const debouncedGetProduct = debounce((searchQuery) => {
    let obj = {
      params: {
        q: searchQuery,
      },
    };
    dispatch(getProduct(obj));
  }, 300);

  const handleSearchClick = () => {
    if (isInputVisible) {
      setSearchQuery("");
      setIsInputVisible(false);
    } else {
      setIsInputVisible(true);
    }
  };

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

  const handlePersonClick = () => {
    if (isLoggedIn) {
      setUser(<BsPerson />);
    } else {
      setUser(<AiOutlineLogin />);
      GoTo("/SignIn");
    }
    setShowOptions(!showOptions);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
    debouncedGetProduct(searchValue);
  };

  const profile = JSON.parse(localStorage.getItem("user"));

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

  const {
    isOpen: menu1,
    onOpen: menu1Open,
    onClose: menu1Close,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigateTo = useNavigate();
  const GoTo = (path) => {
    navigateTo(path);
  };

  return (
    <>
      <Box className="mainNavbar">
        <Box className="UpperNavbar">
          <Flex
            justify={"space-between"}
            paddingRight={6}
            paddingLeft={40}
            padding={1}
          >
            <Container>
              <Flex alignItems={"center"} gap={3} marginLeft={"20px"}>
                <FaFacebookF />
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "22px",
                    fontWeight: "550",
                    marginRight: "20px",
                  }}
                >
                  1.8 M Followers
                </p>
                <BsInstagram />
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "22px",
                    fontWeight: "550",
                  }}
                >
                  682k followers
                </p>
              </Flex>
            </Container>
            <Container>
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "15px",
                  lineHeight: "22px",
                  padding: "5px",
                }}
              >
                Open doors to a world of fashion | Young and fresh
              </p>
            </Container>
            <Container display={"flex"} justifyContent={"flex-end"}>
              <p style={{ fontSize: "14px" }}>English</p>
              <BiChevronDown />
            </Container>
          </Flex>
        </Box>
        <Box
          style={{
            height: "1px",
            width: "100%",
            borderBottom: "1px solid grey",
            borderColor: "#EEEEEE",
          }}
        ></Box>
        <Box className="LowerNavbar">
          <Flex>
            <Container>
              <Flex className="LowerNavCont">
                <Menu isOpen={menu1}>
                  <MenuButton
                    variant="unstyled"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    mx={1}
                    py={[1, 2, 2]}
                    px={4}
                    borderRadius={5}
                    // _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                    aria-label="Courses"
                    onMouseEnter={menu1Open}
                    onMouseLeave={menu1Close}
                  >
                    Mens {menu1 ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </MenuButton>
                  <MenuList onMouseEnter={menu1Open} onMouseLeave={menu1Close}>
                    <Box style={{ width: "70vw", height: "70vh" }}>
                      <Flex>
                        <Box style={{ width: "70%" }}>
                          <Flex
                            justify={"space-between"}
                            style={{ padding: "10px" }}
                          >
                            <Box
                              style={{ fontSize: "12px", fontWeight: "800" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Clothing
                              </MenuItem>
                              <Link to="/product">
                                <MenuItem>New In</MenuItem>
                                <MenuItem>View All</MenuItem>
                                <MenuItem>T-Shirts</MenuItem>
                                <MenuItem>Jackets & Coats</MenuItem>
                                <MenuItem>Hoodies & Sweatshirts</MenuItem>
                                <MenuItem>Sweatpants</MenuItem>
                                <MenuItem>Shorts</MenuItem>
                                <MenuItem>Co-ords sets</MenuItem>
                              </Link>
                            </Box>
                            <Box
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Brand
                              </MenuItem>
                              <MenuItem>Essentials by Fashion Hub</MenuItem>
                              <MenuItem>Nike</MenuItem>
                              <MenuItem>TigerBear</MenuItem>
                              <MenuItem>Bravesoul</MenuItem>
                              <MenuItem>Adidas</MenuItem>
                            </Box>
                            <Box
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Fashion Hub Speacials
                              </MenuItem>
                              <MenuItem>Manish Malhotra</MenuItem>
                              <MenuItem>Sabyasachchi</MenuItem>
                            </Box>
                          </Flex>
                        </Box>
                        <Box style={{ textAlign: "center" }}>
                          <img src={Mens_Image} className="imageMens" alt="" />
                        </Box>
                      </Flex>
                    </Box>
                  </MenuList>
                </Menu>
                <Menu isOpen={isOpen}>
                  <MenuButton
                    variant="Ghost"
                    mx={1}
                    py={[1, 2, 2]}
                    px={4}
                    borderRadius={5}
                    // _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                    aria-label="Courses"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                  >
                    Womens {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </MenuButton>
                  <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <Box style={{ width: "70vw", height: "70vh" }}>
                      <Flex>
                        <Box style={{ width: "70%" }}>
                          <Flex
                            justify={"space-between"}
                            style={{ padding: "10px" }}
                          >
                            <Box
                              style={{ fontSize: "12px", fontWeight: "800" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Clothing
                              </MenuItem>
                              <Link to="/product">
                                <MenuItem>New In</MenuItem>
                                <MenuItem>View All</MenuItem>
                                <MenuItem>Lounge & Sleepware</MenuItem>
                                <MenuItem>Lingerie & innerwear</MenuItem>
                                <MenuItem>Sweatshirts</MenuItem>
                                <MenuItem>Sports bra</MenuItem>
                                <MenuItem>Bodysuits</MenuItem>
                                <MenuItem>Outerwear</MenuItem>
                                <MenuItem>Jeans</MenuItem>
                                <MenuItem>Shorts</MenuItem>
                                <MenuItem>T-Shirts</MenuItem>
                                <MenuItem>Lagging</MenuItem>
                                <MenuItem>Pants</MenuItem>
                              </Link>
                            </Box>
                            <Box
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Brand
                              </MenuItem>
                              <MenuItem>Essentials by Fashion Hub</MenuItem>
                              <MenuItem>Nike</MenuItem>
                              <MenuItem>TigerBear</MenuItem>
                              <MenuItem>Bravesoul</MenuItem>
                              <MenuItem>Adidas</MenuItem>
                            </Box>
                            <Box
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              <MenuItem
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Shoes
                              </MenuItem>
                              <MenuItem>New In</MenuItem>
                              <MenuItem>View All</MenuItem>
                              <MenuItem>Sneakers</MenuItem>
                              <MenuItem>Heels</MenuItem>
                              <MenuItem>Sliders & flip flops</MenuItem>
                              <MenuItem>Boots</MenuItem>
                            </Box>
                          </Flex>
                        </Box>
                        <Box style={{ textAlign: "center" }}>
                          <img
                            src={womens_Image}
                            className="imageMens"
                            alt=""
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </MenuList>
                </Menu>
              </Flex>
            </Container>
            <Container>
              <Box style={{ textAlign: "center", marginLeft: "10%" }}>
                <Link to="/">
                  <Heading padding={"10px"}>Fashion Hub</Heading>
                </Link>
              </Box>
            </Container>
            <Container height="80%" m={"auto"}>
              <Flex justify={"space-between"} ml="45%">
                <Stack
                  flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                >
                  <Button
                    variant={"unstyled"}
                    fontSize={"22px"}
                    onClick={handleSearchClick}
                  >
                    <BsSearch />
                  </Button>
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
                        top="0px"
                        right={"calc(100% - 70px)"}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Box>
                            <Text>
                              {" "}
                              {profile && (
                                <Box textAlign={"left"}>
                                  <Text>Hi {profile.name}</Text>
                                  <Text>{profile.email}</Text>
                                  <Link to={"/getorders"}>
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

                  <Link to="/cart">
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      textAlign="center"
                      fontWeight={"bold"}
                      gap={2}
                      variant={"unstyled"}
                      cursor="pointer"
                      fontSize={{
                        xl: "25px",
                        lg: "16px",
                        md: "13px",
                        base: "10px",
                      }}
                      onClick={() => GoTo("")}
                      color={"black"}
                    >
                      <BiShoppingBag color={"black"} />
                    </Button>
                  </Link>
                </Stack>
              </Flex>
            </Container>
          </Flex>

          <Box
            className="overlay"
            w="300px"
            float={"right"}
            position={"sticky"}
            mr="40px"
          >
            {isInputVisible && (
              <Input
                type="text"
                position={"absolute"}
                zIndex={5}
                top={0}
                left={0}
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Enter search query"
              />
            )}
            <Box
              w="300px"
              mt="40px"
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
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
