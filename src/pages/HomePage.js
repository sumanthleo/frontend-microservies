import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import axios from "axios";
import Product from "../commom/product";
import { Grid,  Typography } from '@mui/material';
import NavBar from "../commom/header";
import Footer from "../commom/footer";
import Silder from "../commom/slider";


const StyledProductContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const StyledProductItems = styled(Grid)(({ theme }) => ({

justifyContent:"center",
alignItems:"center"
}));

function HomePage({ cat = false, filters, sort }) {
  const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
       
          "https://microservices-gateway.onrender.com/products"
      );
      setProducts(response.data);
      console.log(response.data)
    };
    getProducts();
  }, []);


  return (
    <>
    <NavBar />
    <Silder />
    <StyledProductContainer m={1}>
      <StyledHeadingText variant="h6">
        TRENDING PRODUCTS : {cat}
      </StyledHeadingText>
      <StyledProductItems  item container spacing={2}>
        {products.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} >
                  <Product item={item} />
                </Grid>
              ))}
      </StyledProductItems>
    </StyledProductContainer>
    <Footer />
    </>

  );
}

export default HomePage;
