import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import CheckoutSteps from "../commom/checkoutSteps";
import { UserContext } from "../useContext/UserContext";

const FormContainer = styled(Grid)({
  marginTop: "2rem",
});

const ShippingPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);

  const [user, setUser] = useState();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setUser(userDetails);
    // eslint-disable-next-line
  }, [userDetails]);

  if (!user) {
    navigate("/login");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch(
    //   saveShippingAddress({
    //     fullName,
    //     address,
    //     city,
    //     postalCode,
    //     country,
    //   })
    // );

    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <FormContainer container direction="column" spacing={2}>
        <Grid item>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography variant="h4" my={3} ml={4} fontWeight={600}>
              Shipping Address :
            </Typography>
            <form onSubmit={submitHandler}>
              <Grid
                container
                spacing={2}
                direction={"column"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={12} width={"50%"}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} width={"50%"}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} width={"50%"}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} width={"50%"}>
                  <TextField
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} width={"50%"}>
                  <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} width={"50%"}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
