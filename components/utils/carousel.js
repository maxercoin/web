import React from "react";
import styles from "./carousel.module.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Box, Image as ChakraImg, Text } from "@chakra-ui/react";
import Image from "next/image";
import items from "./items";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./carousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
function Carouselcomponent() {
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
    <Box w="100vw" display="flex" justifyItems="center">
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        navigation
        keyboard
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className={style.swiper}
      >
        {items.map((v, index) => (
          <SwiperSlide className={style.slide} key={index + "carousel"}>
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
                src={v.img}
              />
              <Box {...carouselBoxestextsBox}>
                <Text
                  color="#fff"
                  fontSize={["1.1em", "1.2em", "1.5em", "2em"]}
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
                  fontSize={["0.8em", "1em", "1.2em"]}
                  className="firstBanner"
                >
                  {v.content}
                </Text>
              </Box>
              <Box {...carouselboxOverLay}></Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Carouselcomponent;
