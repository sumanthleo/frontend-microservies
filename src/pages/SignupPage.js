import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, CircularProgress, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Grid)(({ theme }) => ({
  backgroundImage: `url("https://prmceam.ac.in/wp-content/uploads/2015/03/background-learner.jpg")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
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

const SignupPage = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event, setInputValue) => {
    setInputValue(event.target.value);
    setError('');
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError('');
      // Make an API call to your signup endpoint
      const response = await axios.post('https://microservices-gateway.onrender.com/users/signup', { email, username, password });
      
      if (response.status === 200) {
        history('/login');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    history('/login');
  };

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <StyledFormContainer item xs={12} sm={6} md={4}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" gutterBottom>
              Enter user email, username, and password
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
              label="Username"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
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
            <StyledButton variant="contained" color="primary" onClick={handleSignup} disabled={loading}>
              {loading && <StyledLoader size={20} />}
              Sign Up
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
              Already have an account?{' '}
              <Link onClick={handleSignupClick}>
                Click here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default SignupPage;
