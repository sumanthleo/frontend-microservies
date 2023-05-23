import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { createOrder } from "../../redux/actions/orderAction";
import { styled } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";
import CheckoutSteps from "../commom/checkoutSteps";
// import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstant";

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

const PaymentContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "10%",
  boxShadow: "0px 0px 5px #ccc",
  margin: theme.spacing(2),
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(5),
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
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.price = toPrice(cart.cart.reduce((a, c) => a + c.count * c.price, 0));
  cart.totalPrice = cart.price * 0.069 + cart.price;
  const totalPrice = toPrice(cart.totalPrice);

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cart.map((item) => ({
          productId: item.productId,
          count: item.count,
          price: item.price,
          totalPrice: item.totalPrice,
          image: item.image,
          name: item.item_name,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.price,
        totalPrice: cart.price * 0.069 + cart.price,
      })
    );
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, loading, error, order } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);

  return (
    <div className="placeorder">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <MainContainer>
        <LeftContainer>
          <h1>Place Order</h1>
          <ShippingContainer>
            <Typography variant="h4" align="center">
              Shipping
            </Typography>
            <Typography style={{ marginLeft: "15px" }}>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </Typography>
          </ShippingContainer>
          <PaymentContainer>
            <Typography variant="h4" align="center">
              Payment
            </Typography>
            <Typography style={{ marginLeft: "15px" }}>
              <strong>Method:</strong> {cart.paymentMethod}
            </Typography>
          </PaymentContainer>
          <OrderItemsContainer>
            <Typography variant="h4" align="center">
              Order Items
            </Typography>
            <ul>
              {cart.cart.map((item) => (
                <li
                  key={item._id}
                  style={{
                    boxShadow: "1px 1px 1px 2px whitesmoke",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="row">
                    <div>
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
                    </div>
                    <div className="min-30">{item.title}</div>

                    <div>
                      {item.count} x {item.price}/- = {item.count * item.price}{" "}
                      /-
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </OrderItemsContainer>
        </LeftContainer>
        <RightContainer>
          <Typography variant="h2" align="center">
            Order Summary
          </Typography>
          <OrderSummaryContainer>
            <ul>
              <li>
                <Typography variant="h6">Order Summary</Typography>
              </li>
              <li>
                <div className="row">
                  <div>Items Price</div>
                  <div>{cart.price} /-</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>15.5 /-</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>4.5 /-</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>{totalPrice} /-</strong>
                  </div>
                </div>
              </li>
              <li>
                <Button
                  variant="contained"
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                  }}
                  disabled={cart.cart.length === 0}
                >
                  Place Order
                </Button>
              </li>
              {loading && <Typography variant="h2">Loading...</Typography>}
              {error && (
                <Typography variant="h2" style={{ color: "red" }}>
                  {error}
                </Typography>
              )}
            </ul>
          </OrderSummaryContainer>
        </RightContainer>
      </MainContainer>
    </div>
  );
}

export default PlaceOrder;
