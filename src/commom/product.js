import React from "react";
import {  useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Grid,  Typography } from "@mui/material";


const ProductItem = styled(Grid)`
  width: 90%;
  height: 400px;
  margin: 10px;
  box-shadow: 0px 1px 5px #e6e6e6;
  cursor:pointer;
`;

const ImageProduct = styled(Grid)`
height: 75%;
  width: 100%;
  object-fit: fill;
  z-index:0;
`;

const ProductDetails = styled(Grid)`
height: 25%;
  margin-left: 3%;
  z-index: 1;
  
`;

const TitleName = styled(Typography)`
  font-size: 25px;
  font-weight: 700;
  color: rgb(233, 164, 37);
`;

const ProductDesc = styled(Typography)`
  font-size: 15px;
  font-style: italic;
  color: lightgray;
`;

const ProductPrice = styled(Typography)`
  font-size: 25px;
  font-weight: 700;
`;
function Product({ item }) {
  const history = useNavigate();

  const onClickHandler = () => {
    history(`/${item._id}`);
  }
  return (
    <ProductItem onClick={onClickHandler}>
        <ImageProduct component={'img'} src={item.image} />
        <ProductDetails>
          <TitleName>{item.title}</TitleName>
          <ProductDesc>{item.description}</ProductDesc>
          <ProductPrice>${item.price}</ProductPrice>
        </ProductDetails>
    </ProductItem>
  );
}

export default Product;
