import React from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const SliderContainer = styled("div")`
  /* SliderContainer styles */
`;

const Newsletter = styled(Grid)`
  text-align: center;
  height: 30px;
  background-color: rgb(235, 157, 55);
`;

const StyledSlider = styled(Carousel)`
  box-shadow: 2px 3px 2px 5px lightgray;
  margin-top: 10px;
  height: 800px;
`;

const BannerImage = styled("img")`
  width: 70%;
  height: 800px;
  opacity: 0.85;
  object-fit: cover;
`;

const ImageContainer = styled(Grid)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ImageText = styled(Grid)`
  font-size: 70px;
  font-weight: 700;
  margin-left: 20px;
`;

function Silder() {
  return (
    <div>
      <Newsletter mt={0.3}>75% off on all products %BUY NOW%</Newsletter>
      <StyledSlider
        className="slider"
        autoPlay={true}
        animation="fade"
        indicators={false}
        // navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        StylesProvider
        navButtonsProps={{
          style: {
            color: "white",
            backgroundColor: "transparent",
            borderRadius: 60,
            margin: 0,
            width: 100,
          },
        }}
      >
        {/* {bannerData.map((image) => (
          <img src={image} className="bannerimg" />
        ))} */}
        <ImageContainer>
          <BannerImage
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2020-04-07-at-4-22-17-pm-1586290947.png?crop=1xw:1xh;center,top&resize=480:*"
            alt=""
            className="bannerimg"
          />
          <ImageText>50% off ON NEW TRENDS</ImageText>
        </ImageContainer>
        <ImageContainer>
          <BannerImage
            src="https://i.pinimg.com/736x/a5/86/8c/a5868c44a2705fe80d9c9d6ff4c8d69c.jpg"
            alt=""
          />
          <ImageText>60% off ON NEW TRENDS</ImageText>
        </ImageContainer>
        <ImageContainer>
          <BannerImage
            src="https://devseg.com/wp-content/uploads/2021/06/half-length-shot-of-two-girls-with-social-media-icon-outdoor-photo-of-female-models-using-shopping.jpg"
            alt=""
          />
          <ImageText>30% off ON NEW TRENDS</ImageText>
        </ImageContainer>
      </StyledSlider>
    </div>
  );
}

export default Silder;
