import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Badge,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserContext } from "../useContext/UserContext";
import { CartContext } from "../useContext/CartContext";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const { userDetails } = useContext(UserContext);
  const UserDetails = userDetails;

  const { cartItems } = useContext(CartContext);

  const [logoutPopup, setLogoutPopup] = useState(false);
  const logoutUser = (e) => {
    // user.logout();
    setLogoutPopup(false);
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutClickHandler = () => {
    console.log("hello");
    setLogoutPopup(true);
    setAnchorElUser(null);
  };

  return (
    <>
      {UserDetails && (
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          p={1}
          sx={{ boxShadow: 1 }}
          bgcolor={"lightblue"}
        >
          <Grid item width={"100px"}>
            <Link to={"/"}>
              <Grid
                item
                // md={2}
                // sm={8}
                component={"img"}
                style={{
                  height: "60px",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={
                  "https://media.istockphoto.com/vectors/online-shop-logo-design-template-vector-id1150644423?k=20&m=1150644423&s=612x612&w=0&h=xKnuj3AhBbMAjxnJdT6Mh7o4BDIGaEwyol33tRwG7mU="
                }
                alt="hello"
              />
            </Link>
          </Grid>

          <Grid
            item
            md={1.5}
            sm={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link to={"/cart"}>
              <Badge badgeContent={cartItems?.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>

            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ marginLeft: "15px", marginRight: "8px" }}
            >
              <Avatar
                alt={UserDetails?.username || "userImg"}
                src={"/static/images/avatar/2.jpg"}
                sx={{
                  backgroundColor: "#0070CC",
                  color: "#fff",
                  fontWeight: 500,
                }}
              />
            </IconButton>

            <Menu
              sx={{ mt: "50px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Edit Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logoutClickHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
            <Badge badgeContent={1} color="primary">
              <NotificationsIcon />
            </Badge>
          </Grid>
        </Grid>
      )}
      {logoutPopup && (
        <Dialog
          open={logoutPopup}
          onClose={() => setLogoutPopup(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutPopup(false)}>No</Button>
            <Button onClick={logoutUser} autoFocus color="info">
              yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Header;
