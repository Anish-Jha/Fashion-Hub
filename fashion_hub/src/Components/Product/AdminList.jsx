import { Button, Heading,Spinner,Box, background, Text } from '@chakra-ui/react';
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProduct,removeProduct  } from '../../Redux/ProductRedux/action';
import AdminCard from './AdminCard';

const AdminList = ({onDelete}) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const location = useLocation();
  const products = useSelector((store) => {
    return store.product.product;
  });

  const dispatch = useDispatch();

  let obj={
    params:{
        category:searchParams.getAll("category"),
        _sort:searchParams.getAll('order') && 'price',
        _order:searchParams.get("order"),
    }
}

  useEffect(() => {
    dispatch(getProduct(obj));
  }, [location.search]);

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
    if (pageNumbers.length <=3) {
      buttons = pageNumbers;
    } else {
      if (currentPage < 3) {
        buttons = [1, 2 , '...', pageNumbers.length];
      } else if (currentPage >= pageNumbers.length - 2) {
        buttons = [1, '...', pageNumbers.length - 2, pageNumbers.length - 1, pageNumbers.length];
      } else {
        buttons = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageNumbers.length];
      }
    }
    return buttons;
  };

  return (
    <>
   <div
     style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(210px, max-content))",
      gridTemplateRows: "repeat(auto-fill)",
      justifyContent:"center",
      gridGap: "20px 10px",
      margin:"auto",
      padding:"5px"
     }}
   >
     {currentProducts.length ? (
       currentProducts.map((element) => <AdminCard key={element.id} product={element} onDelete={() => handleDelete(element.id)}/>)
     ) : (
       <div style={{ display: 'flex' }}>
         <Heading>Loading...</Heading>
         <Spinner margin='auto' thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
       </div>
     )}
   </div>
   <Box display={'flex'} w={['100%','80%','20%']} gap={'10px'} justifyContent={'center'} m='auto' mt={'40px'} mb='40px'>
     <Button bgColor={'lightgreen'} borderRadius={'full'} onClick={prevPage} disabled={currentPage===1}>
       {'<'}
     </Button>
     {getPageButtons().map((pageNumber, index)=>(
       <React.Fragment key={index}>
         {pageNumber === '...' ? (
           <Button bgColor={'lightgreen'} borderRadius={'full'} key={index} disabled>
             ...
           </Button>         ) : (
       <Button bgColor={'lightgreen'} borderRadius={'full'} key={index} onClick={() => paginate(pageNumber)} isActive={currentPage === pageNumber}>
         {pageNumber}
       </Button>
     )}
   </React.Fragment>
 ))}
 <Button bgColor={'lightgreen'} borderRadius={'full'} onClick={nextPage} disabled={currentPage === pageNumbers.length}>
   {'>'}   </Button>
   </Box>
</>
  );
};

export default AdminList;
