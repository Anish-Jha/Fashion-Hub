import { Button, Heading, Spinner, Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProduct } from "../../Redux/ProductRedux/action";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const products = useSelector((store) => {
    return store.product.product;
  });

  const dispatch = useDispatch();

  let obj = {
    params: {
      category: searchParams.getAll("category"),
      sort: searchParams.getAll("order") && "price",
      order: searchParams.get("order"),
    },
  };

  useEffect(() => {
    dispatch(getProduct(obj));
  }, [location.search]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    let buttons = [];
    if (pageNumbers.length <= 3) {
      buttons = pageNumbers;
    } else {
      if (currentPage < 3) {
        buttons = [1, 2, "...", pageNumbers.length];
      } else if (currentPage >= pageNumbers.length - 2) {
        buttons = [
          1,
          "...",
          pageNumbers.length - 2,
          pageNumbers.length - 1,
          pageNumbers.length,
        ];
      } else {
        buttons = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pageNumbers.length,
        ];
      }
    }
    return buttons;
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, max-content))",
          gridTemplateRows: "repeat(auto-fill)",
          justifyContent: "center",
          gridGap: "20px 0px",
          margin: "auto",
        }}
      >
        {currentProducts.length ? (
          currentProducts.map((element) => (
            <ProductCard key={element.id} product={element} />
          ))
        ) : (
          <Box w="max-content" m="auto" textAlign={'center'}>
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
      </div>
      <Box
        display={"flex"}
        w={["100%", "80%", "20%"]}
        gap={"10px"}
        justifyContent={"center"}
        m="auto"
        mt={"40px"}
        mb="40px"
      >
        <Button
          bgColor={"skyblue"}
          borderRadius={"full"}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        {getPageButtons().map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === "..." ? (
              <Button
                bgColor={"skyblue"}
                borderRadius={"full"}
                key={index}
                disabled
              >
                ...
              </Button>
            ) : (
              <Button
                bgColor={"skyblue"}
                borderRadius={"full"}
                key={index}
                onClick={() => paginate(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </Button>
            )}
          </React.Fragment>
        ))}
        <Button
          bgColor={"skyblue"}
          borderRadius={"full"}
          onClick={nextPage}
          disabled={currentPage === pageNumbers.length}
        >
          {">"}{" "}
        </Button>
      </Box>
    </>
  );
};

export default ProductList;
