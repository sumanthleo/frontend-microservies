import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CartContext } from "../useContext/CartContext";
import { styled } from "@mui/system";

const MainCartContainer = styled(Box)({
  margin: "10px",
});

const ShoppingBag = styled(Typography)({
  fontSize: "10px",
  textDecoration: "underline",
});

const CartImage = styled("img")({
  width: "100%",
  height: "50%",
  objectFit: "contain",
  borderRadius: "10px",
});

const RemoveCartBtn = styled(Button)({
  marginLeft: "20px",
});

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // useEffect hook to store cart items in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const incrementQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].count += 1;
      setCartItems(updatedCartItems);
    }
  };

  const decrementQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].count -= 1;

      if (updatedCartItems[existingItemIndex].count === 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    setCartItems(updatedCartItems);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <MainCartContainer>
      <Typography variant="h4" align="center" fontWeight="bold">
        YOUR BAG ITEMS
      </Typography>
      <Box display="flex" justifyContent="center" fontSize="30px">
        <ShoppingBag variant="h6">
          SHOPPING BAG({cartItems?.length})
        </ShoppingBag>
      </Box>
      <Grid item container>
        {cartItems?.length <= 0 ? (
          <Grid item xs={12}>
            <Box
              width="100%"
              my={11}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" align="center">
                Your cart is empty{" "}
                <Link to={"/"}>
                  <Button variant="contained" color="primary">
                    Go Back
                  </Button>
                </Link>
              </Typography>
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item container xs={12} md={8}>
              {cartItems?.map((item) => (
                <Grid
                  item
                  container
                  key={item._id}
                  py={1}
                  sx={{
                    width: "80%",
                    height: "200px",
                    margin: "20px",
                    boxShadow: "2px 2px 2px 2px lightblue",
                    borderRadius: "10px",
                  }}
                >
                  <Grid item container xs={4} md={4} lg={4}>
                    <Grid item height={"375px"} width={"200px"} ml={4}>
                      <CartImage src={item.image} alt="" />
                    </Grid>
                  </Grid>
                  <Grid item container xs={5.5} md={5.5} lg={5.5} mt={1}>
                    <Grid item container direction={"column"}>
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <Typography>{item.description}</Typography>
                      <Grid
                        item
                        container
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                      >
                        <IconButton
                          disabled={item?.count === 1}
                          color="primary"
                          aria-label="remove from cart"
                          onClick={() => decrementQuantity(item)}
                        >
                          -
                        </IconButton>
                        <Typography>{item?.count || 0}</Typography>
                        <IconButton
                          color="primary"
                          aria-label="add to cart"
                          onClick={() => incrementQuantity(item)}
                        >
                          +
                        </IconButton>
                      </Grid>
                      <Grid item mt={4.5}>
                        <Typography>Item Price: {item.price}/-</Typography>
                        <Typography fontWeight="bold">
                          Total: {item.price * item.count}/-
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container xs={3} md={2.5} lg={2.5}>
                    <Grid item mt={"80%"}>
                      <RemoveCartBtn
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove Item
                      </RemoveCartBtn>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                p={2}
                bgcolor="#f5f5f5"
                borderRadius="10px"
                height={"250px"}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">ORDER SUMMARY</Typography>
                <Box mt={3}>
                  <Typography variant="body1" fontWeight="bold">
                    SUBTOTAL:{" "}
                    {cartItems
                      ?.reduce(
                        (currentSum, currentCartItem) =>
                          currentSum +
                          currentCartItem.count * currentCartItem.price,
                        0
                      )
                      .toFixed(1)}{" "}
                    /-
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ESTIMATED SHIPPING: 0/-
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    DISCOUNT: 5%
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={2}
                    sx={{ marginBottom: "10px" }}
                  >
                    TOTAL:{" "}
                    {cartItems
                      ?.reduce(
                        (currentSum, currentCartItem) =>
                          currentSum +
                          currentCartItem.count * currentCartItem.price * 1.002,
                        0
                      )
                      .toFixed(1)}
                    /-
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={cartItems?.length === 0}
                    onClick={checkoutHandler}
                  >
                    CHECKOUT NOW
                  </Button>
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </MainCartContainer>
  );
}

export default Cart;
