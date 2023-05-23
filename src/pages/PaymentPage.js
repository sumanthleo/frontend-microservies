import React, { useState } from "react";
import { styled } from "@mui/system";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { savePaymentMethod } from "../../redux/actions/cartAction";
import CheckoutSteps from "../commom/checkoutSteps";
import { Typography, Radio, Button, Grid } from "@mui/material";

const PaymentForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

const PaymentMethodContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
}));

const PaymentMethodItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

function PaymentPage() {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const cart = useSelector((state) => state.cart);
  //   const { shippingAddress } = cart;
  //   if (!shippingAddress.address) {
  //     navigate("/shipping");
  //   }

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <PaymentForm onSubmit={submitHandler}>
        <Grid>
          <Typography variant="h4" fontWeight={600}>
            Payment Method
          </Typography>
        </Grid>
        <PaymentMethodContainer>
          <PaymentMethodItem>
            <Radio
              id="razorpay"
              value="Razorpay"
              name="paymentMethod"
              required
              checked={paymentMethod === "Razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="razorpay">Razorpay</label>
          </PaymentMethodItem>
          <PaymentMethodItem>
            <Radio
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              disabled
              required
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">Paypal</label>
          </PaymentMethodItem>
        </PaymentMethodContainer>
        <Grid mt={3}>
          <Button variant="contained" type="submit" color="success">
            Continue
          </Button>
        </Grid>
      </PaymentForm>
    </>
  );
}

export default PaymentPage;
