import React from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

const CheckoutStepsContainer = styled(Grid)(({ theme }) => ({
  marginTop: "2%",
  display: "flex",
  justifyContent: "space-between",
}));

const Step = styled("div")(({ theme, active }) => ({
  borderTop: active ? "5px lightblue solid" : "0.3px #c0c0c0 solid",
  color: active ? "green" : "orange",
  flex: 1,
  padding: 5,
  fontWeight: active ? 800 : "bold",
  fontSize: active ? 20 : "inherit",
}));

function CheckoutSteps(props) {
  return (
    <CheckoutStepsContainer container>
      {/* <Step item active={props.step1}>
        Sign-In
      </Step> */}
      <Step item active={props.step2}>
        Shipping
      </Step>
      <Step item active={props.step3}>
        Payment
      </Step>
      <Step item active={props.step4}>
        Place Order
      </Step>
    </CheckoutStepsContainer>
  );
}

export default CheckoutSteps;
