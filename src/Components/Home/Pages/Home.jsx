import { Box, Text, Image, SimpleGrid, Spinner, Heading } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHome, getHome_Product } from "../../../Redux/HomeProduct/action";
// import Navbar from "../../Navbar/Navbar"
import Carausal from "../Components/Carausal";
import ProductCart from "../Components/ProductCart";
const breakpoints = {
  base: "420px",
  sm: "550px",
  md: "700px",
  lg: "850px",
  xl: "950px",
  "2xl": "1200px",
};

const theme = extendTheme({ breakpoints });

function Home() {
  const products = useSelector((store) => {
    return store.homeReducer.home;
  });

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      dispatch(getHome());
    },5000);
  
    // Cleanup function to cancel the timeout if the component unmounts or the dependencies change.
    return () => clearTimeout(timeoutId);
  }, [dispatch]);
  return (
    <>
      {/* <Navbar/> */}
      <Box className="main_home_box" mb="100px">
        <Box className="top_banner_box" m="auto" w="100%">
          <Image src="kooves banner.png" m="auto" w="90%" p="5%" />
        </Box>
        <Box
          className="second_top_banner_box"
          display="flex"
          mt="20px"
          w="100%"
          m="auto"
          gap={["8px", "10px", "12px", "15px", "20px", "22px"]}
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/artist_edite_sections_re-02.jpg?v=1675945846&width=360"
            w={["30%", "30%", "40%", "50%"]}
            m="auto"
          />
          <Image
            src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/artist_edite_sections_re-01.jpg?v=1675945931&width=360"
            w={["30%", "30%", "40%", "50%"]}
            m="auto"
          />
          <Image
            src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/neverlechew-05a_7497cf47-cebb-4dda-a282-f977bab2532f.jpg?v=1675862765&width=360"
            w={["30%", "30%", "40%", "50%"]}
            m="auto"
          />
        </Box>

        <Box className="gorge_thome" w="90%" m="auto" mt="20px">
          <Text
            textAlign="start"
            mb="20px"
            fontSize="40px"
            fontFamily="heading-font"
          >
            Shop Men's
          </Text>
          <Carausal />
        </Box>
        <Box
          className="featured_brands"
          display="flex"
          p="3%"
          gap="20px"
          fontFamily="SF-body-font"
          fontSize="17.5px"
          textAlign="start"
        >
          <Box>
            <Image
              src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/KOOVS_20OCT22-1007.jpg?v=1667990812&width=720"
              alt=""
            />
            <Text>Essentials bt Koovs</Text>
          </Box>
          <Box>
            <Image
              src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/KOOVS_20OCT22-3213-141.jpg?v=1667995128&width=720"
              alt=""
            />
            <Text>Koovs</Text>
          </Box>
        </Box>
        <Box className="product_map_box" w="95%" m="auto">
          {!loading ? (
            <SimpleGrid
              templateColumns={[
                "repeat(2,1fr)",
                "repeat(3,1fr)",
                "repeat(4,1fr)",
              ]}
              m="auto"
            >
              {products.map((e) => (
                <ProductCart
                  key={e.id}
                  image={e.image}
                  image2={e.image2}
                  price={e.price}
                  title={e.title}
                />
              ))}
            </SimpleGrid>
          ):(
            <Box w="max-content" m="auto">
            <Heading>Loading...</Heading>
              <Spinner
                margin="auto"
                w="100px"
                h="100px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
export default Home;
