import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Grid)(({ theme }) => ({
  backgroundImage: `url("https://prmceam.ac.in/wp-content/uploads/2015/03/background-learner.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  padding: theme.spacing(4),
}));

const StyledFormContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledLoader = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const LoginPage = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event, setInputValue) => {
    setInputValue(event.target.value);
    setError("");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Make an API call to your login endpoint
      const response = await axios.post(
        "https://microservices-gateway.onrender.com/users/login",
        { email, password }
      );

      // Assuming the API response contains a success flag
      if (response.status === 200) {
        localStorage.setItem("userDetails", JSON.stringify(response.data));

        // Redirect to the home page after successful login
        history("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    history("/signup");
  };

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <StyledFormContainer item xs={12} sm={6} md={4}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              Enter your email and password
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
          </Grid>
          <Grid item>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading && <StyledLoader size={20} />}
              Login
            </StyledButton>
          </Grid>
          {error && (
            <Grid item>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link onClick={handleSignupClick} color="primary">
                Click here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default LoginPage;
