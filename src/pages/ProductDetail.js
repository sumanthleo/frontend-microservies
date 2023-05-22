import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
// import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ContainerPost = styled("div")({
  marginTop: "3%",
  marginBottom: "5%",
});

const PostContainer = styled("div")({
  display: "flex",
  width: "100%",
  marginTop: "4%",
});

const PostImg = styled("div")({
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

const Title = styled("span")({
  fontSize: "40px",
  fontWeight: "bold",
  marginLeft: "3%",
  marginBottom: 0,
});

const PostDesc = styled("div")({
  width: "50%",
  display: "flex",
  flexDirection: "column",
});

const Desc = styled("p")({
  fontSize: "1.5rem",
  marginLeft: "3%",
  marginBottom: 0,
  marginTop: "-10px",
  fontStyle: "italic",
});

const PriceTag = styled("span")({
  fontSize: "1.5rem",
  marginBottom: 0,
  marginTop: "-10px",
});

const Price = styled("div")({
  marginLeft: "3%",
  marginTop: "-10px",
  fontWeight: "bold",
});

// const Filters = styled("div")({
//   margin: "3%",
//   fontSize: "30px",
//   fontStyle: "italic",
// });

// const ColorSelect = styled(Select)({
//   width: "25%",
//   padding: "10px",
//   marginLeft: "2%",
//   fontSize: "20px",
//   fontWeight: 600,
// });

// const SizeSelect = styled(Select)({
//   width: "25%",
//   padding: "10px",
//   marginLeft: "2%",
//   fontSize: "20px",
//   fontWeight: 600,
// });

const AddToCart = styled("div")({
  display: "flex",
  margin: "3%",
});

const AddToCartButton = styled(Button)({
  padding: "10px 30px",
  marginLeft: "35%",
  border: "none",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
});

const GoToCartButton = styled(Button)({
  float: "right",
  marginRight: "10%",
  padding: "5px 50px",
  border: "none",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
  borderRadius: "16px",
  backgroundColor: "rgb(230, 172, 66)",
  color: "blue",
});

function SinglePost() {
  const location = useLocation().pathname.split("/")[1];
  const [product, setProduct] = useState({});
  // const [color, setColor] = useState();
  // const [size, setSize] = useState();
  // const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        "https://microservices-gateway.onrender.com/products/" + location
      );

      setProduct(response.data);
    };
    getProducts();
  }, [location]);

  const handleClick = (e) => {
    e.preventDefault();
    // dispatch(addToCart(product));
  };

  return (
    <ContainerPost>
      <Title>{product.category}</Title>
      <Link to={"/cart"}>
        <GoToCartButton style={{ marginTop: "10px" }}>
          CHECK OUT CART
        </GoToCartButton>
      </Link>
      <PostContainer>
        <PostImg>
          <PostImgBox src={product.image} alt="" />
        </PostImg>
        <PostDesc>
          <Title className="title">{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>
            <PriceTag>₹</PriceTag>
            <PriceTag>{product.price}</PriceTag>
          </Price>
          
          <AddToCart>
            <AddToCartButton variant="contained" onClick={handleClick}>
              ADD TO CART
            </AddToCartButton>
          </AddToCart>
        </PostDesc>
      </PostContainer>
    </ContainerPost>
  );
}

export default SinglePost;
