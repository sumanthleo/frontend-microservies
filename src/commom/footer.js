import React from "react";
import { Divider, Grid, List, ListItem, Typography } from "@mui/material";
// import Logo from "assests/logo-1.svg";

const Footer = () => {
    return (
        <Grid
            container
            pt={6}
            // px={1}
            // height={350}
            mt={6}
            direction={"column"}
            sx={{
                border: "1px solid lightgrey",
                backgroundColor: "lightblue",
            }}
        >
            <Grid item container>
                <Grid item md={6}>
                    {/* <Grid component={"img"} src={Logo} /> */}
                    <Typography p={5}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, veniam
                        iusto. Impedit temporibus nesciunt fugit pariatur nisi voluptatem. Porro
                        voluptas necessitatibus voluptate?
                    </Typography>
                </Grid>
                <Grid item md={2} xs={6}>
                    <Typography variant="h6" fontWeight={700}>Pages</Typography>
                    <List>
                        <ListItem>Home</ListItem>
                        <ListItem>Products</ListItem>
                        <ListItem>ProductDetails</ListItem>
                        <ListItem>Cart</ListItem>
                    </List>
                </Grid>
                <Grid item md={2} xs={6}>
                    <Typography variant="h6" fontWeight={700}>Mens Category</Typography>
                    <List>
                        <ListItem>shirts</ListItem>
                        <ListItem>pants</ListItem>
                        <ListItem>t-shirts</ListItem>
                        <ListItem>formals</ListItem>
                    </List>
                </Grid>
                <Grid item md={2} xs={6}>
                    <Typography variant="h6" fontWeight={700}>Electronic</Typography>
                    <List>
                        <ListItem>Mobiles</ListItem>
                        <ListItem>Laptops</ListItem>
                        <ListItem>Ipads</ListItem>
                        <ListItem>Headphones</ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid item container direction={"column"} pb={2} mb={0.1} bgcolor={"#fff"}>
                <Divider />
                <Typography mt={3} ml={5}>
                    &#169; 2023 trainovate.com All Rights Reserved
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;