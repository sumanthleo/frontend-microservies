import React from "react";
import { styled } from "@mui/system";
import { Grid, Typography, Button, ListItem, Box } from "@mui/material";
import CheckoutSteps from "../commom/checkoutSteps";

const MainContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  width: "98%",
  marginTop: theme.spacing(3),
}));

const LeftContainer = styled(Grid)(({ theme }) => ({
  width: "70%",
}));

const RightContainer = styled(Grid)(({ theme }) => ({
  width: "27%",
}));

const ShippingContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "15%",
  boxShadow: "0px 0px 5px #ccc",
  margin: theme.spacing(2),
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  borderRadius: "10px",
}));

const OrderItemsContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "auto",
  boxShadow: "0px 0px 5px #ccc",
  margin: theme.spacing(2),
}));

const OrderSummaryContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  boxShadow: "0px 0px 5px #ccc",
  marginLeft: theme.spacing(4),
  marginTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

function PlaceOrder(props) {
  const cartArray = localStorage.getItem("cart");
  const cart = JSON.parse(cartArray);

  // if (!cart.paymentMethod) {
  //   navigate("/payment");
  // }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.price = toPrice(cart?.reduce((a, c) => a + c.count * c.price, 0));
  cart.totalPrice = cart.price * 0.069 + cart.price;
  const totalPrice = toPrice(cart.totalPrice);

  const placeOrderHandler = () => {
    // Place order logic
  };

  return (
    <Grid className="placeorder">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <MainContainer>
        <LeftContainer>
          <Typography variant="h4" fontWeight={600}>
            Place Order
          </Typography>
          <ShippingContainer>
            <Typography variant="h5" align="center">
              Shipping
            </Typography>
            {/* <Typography style={{ marginLeft: "15px" }}>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </Typography> */}
          </ShippingContainer>
          <OrderItemsContainer>
            <Typography variant="h5" align="center">
              Order Items
            </Typography>
            <ul>
              {cart.map((item) => (
                <ListItem
                  key={item._id}
                  style={{
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <Grid
                    item
                    container
                    justifyContent={"space-around"}
                    alignItems={"center"}
                  >
                    <Grid>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "10px",
                          borderRadius: "10px",
                        }}
                      ></img>
                    </Grid>
                    <Grid className="min-30">{item.title}</Grid>

                    <Grid>
                      {item.count} x {item.price}/- = {item.count * item.price}{" "}
                      /-
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </ul>
          </OrderItemsContainer>
        </LeftContainer>
        <RightContainer>
          <Typography variant="h4" align="center" fontWeight={600}>
            Order Summary
          </Typography>
          <OrderSummaryContainer>
            <ul>
              <ListItem>
                <Typography variant="h6">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid>Items Price : {cart.price} /-</Grid>
              </ListItem>
              <ListItem>
                <Grid>Shipping Fee: {cart?.length === 0 ? " " : "15.5/-"}</Grid>
              </ListItem>
              <ListItem>
                <Grid>Tax : {cart?.length === 0 ? " " : "4.5/-"}</Grid>
              </ListItem>
              <ListItem>
                <Grid>
                  <Box>Order Total : {totalPrice} /-</Box>
                </Grid>
              </ListItem>

              {/* Add loading and error messages */}
            </ul>
            <Grid item px={3}>
              <Button
                variant="contained"
                type="button"
                onClick={placeOrderHandler}
                color="success"
                fullWidth
                disabled={cart?.length === 0}
              >
                Place Order
              </Button>
            </Grid>
          </OrderSummaryContainer>
        </RightContainer>
      </MainContainer>
    </Grid>
  );
}

export default PlaceOrder;
