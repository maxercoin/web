import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./carousel.module.css";
import { Box, Image as ChakraImg, Text } from "@chakra-ui/react";
import Image from "next/image";
import items from "./items";
// import banner1 from "./slider/banner1.jpg";
// import banner2 from "./slider/banner2.png";
// import banner3 from "./slider/banner3.png";
// import banner4 from "./slider/banner4.png";
// import banner5 from "./slider/banner5.jpg";
function Carouselcomponent() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const carouselBoxes = {
    display: "grid",
    placeItems: "center",
  };
  const carouselBoxestextsBox = {
    position: "absolute",
    zIndex: "1",
  };
  const carouselboxOverLay = {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: "0.5",
    position: "absolute",
    // zIndex:'1'
  };
  return (
    <Carousel
      itemClass={styles.items}
      showDots
      dotListClass={styles.dotStyles}
      autoPlay
      infinite
      className={styles.carousel}
      responsive={responsive}
    >
      {items.map((v, index) => (
        <Box
          key={`${index}carouselhome`}
          {...carouselBoxes}
          position="relative"
          overflow="hidden"
          width="100%"
          h="100%"
        >
          <ChakraImg
            className={styles.img}
            as={Image}
            alt="Banner1"
            layout="intrinsic"
            width="100vw"
            src={v.img}
          />
          <Box {...carouselBoxestextsBox}>
            <Text
              color="#fff"
              fontSize="2em"
              fontWeight="500"
              p="5"
              wordWrap={true}
              className="firstBanner"
              textAlign="center"
            >
              {v.header}
            </Text>
            <Text
              flex={1}
              wordWrap={true}
              p="5"
              textAlign="center"
              color="#fff"
              fontSize="1.2em"
              className="firstBanner"
            >
              {v.content}
            </Text>
          </Box>
          <Box {...carouselboxOverLay}></Box>
        </Box>
      ))}
    </Carousel>
  );
}

export default Carouselcomponent;
