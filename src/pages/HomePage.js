import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Product from "../commom/product";
import { Grid, Typography, Skeleton } from "@mui/material";
import Slider from "../commom/slider";
import useLongPollingHook from "../customHooks/customHook";

const StyledProductContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const StyledProductItems = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
}));

function HomePage({ cat = false, filters, sort }) {
  const { data, loading } = useLongPollingHook(
    "https://microservices-gateway.onrender.com/products"
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Slider />
      <StyledProductContainer m={1}>
        <StyledHeadingText variant="h6">
          TRENDING PRODUCTS: {cat}
        </StyledHeadingText>
        {loading ? (
          <StyledProductItems item container spacing={2}>
            {Array.from(Array(5).keys()).map((index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))}
          </StyledProductItems>
        ) : (
          <StyledProductItems item container spacing={2}>
            {data?.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                <Product item={item} />
              </Grid>
            ))}
          </StyledProductItems>
        )}
      </StyledProductContainer>
    </>
  );
}

export default HomePage;
