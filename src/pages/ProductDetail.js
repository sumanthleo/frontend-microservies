import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../useContext/CartContext";

const ContainerPost = styled(Grid)({
  marginTop: "1%",
  marginBottom: "5%",
});

const PostContainer = styled(Grid)({
  display: "flex",
  width: "100%",
  marginTop: "4%",
});

const PostImg = styled(Grid)({
  width: "50%",
  height: "65vh",
  marginLeft: "4%",
});

const PostImgBox = styled("img")({
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  objectFit: "contain",
});

const Title = styled(Typography)({
  fontSize: "40px",
  fontWeight: "bold",
});

const PostDesc = styled(Grid)({
  width: "43%",
  marginLeft: "2%",
  display: "flex",
  flexDirection: "column",
});

const Desc = styled(Typography)({
  fontSize: "1rem",
  fontStyle: "italic",
  color: "gray",
});

const PriceTag = styled(Typography)({
  fontSize: "1.5rem",
  marginTop: "18%",
});

const AddToCart = styled(Grid)({
  display: "flex",
  marginTop: "2%",
  gap: "30px",
});

const AddToCartButton = styled(Button)({
  padding: "10px 30px",
  border: "none",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
});

const GoToCartButton = styled(Button)({
  padding: "10px 30px",
  border: "none",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
});

function SinglePost() {
  const location = useLocation().pathname.split("/")[1];
  const [product, setProduct] = useState({});
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        "https://microservices-gateway.onrender.com/products/" + location
      );

      setProduct(response.data);
    };
    getProducts();
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    addItemToCart(product);
  };

  return (
    <ContainerPost>
      <Grid container display={"flex"} direction={"row"} gap={3} ml={1.5}>
        <IconButton component={Link} to="/" aria-label="Back">
          <ArrowBackIcon />
        </IconButton>
        <Title>{product.title}</Title>
      </Grid>
      <PostContainer>
        <PostImg>
          <PostImgBox src={product.image} alt="" />
        </PostImg>
        <PostDesc>
          <Title className="title">{product.title}</Title>
          <Desc>{product.description}</Desc>
          <PriceTag>₹ {product.price}</PriceTag>
          <AddToCart>
            <AddToCartButton variant="contained" onClick={handleAddToCartClick}>
              ADD TO CART
            </AddToCartButton>
            <Link to={"/cart"}>
              <GoToCartButton variant="contained">
                CHECK OUT CART
              </GoToCartButton>
            </Link>
          </AddToCart>
        </PostDesc>
      </PostContainer>
    </ContainerPost>
  );
}

export default SinglePost;
