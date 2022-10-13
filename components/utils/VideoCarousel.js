import React from "react";
import styles from "./carousel.module.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import {
  AspectRatio,
  Box,
  Image as ChakraImg,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
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
function VideoCarousel() {
  const carouselBoxes = {
    display: "grid",
    placeItems: "center",
  };
  const [isLargerThan500] = useMediaQuery("(min-width:500px)");
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
    <Box w="100vw" display="flex" justifyItems="center" mt='5'>
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
        <SwiperSlide className={style.slide}>
          <iframe
            title=""
            src="https://video.wixstatic.com/video/836da5_7dc6b89321494d5f810e725adcd81fee/1080p/mp4/file.mp4"
            allowFullScreen
            width="100%"
            height="400px"
          />
        </SwiperSlide>
        <SwiperSlide className={style.slide}>
          <iframe
            title=""
            src="https://video.wixstatic.com/video/836da5_4cc22bd0f5c34a47956823f6880c4c7f/1080p/mp4/file.mp4"
            allowFullScreen
            width="100%"
            height="400px"
          />
        </SwiperSlide>
        <SwiperSlide className={style.slide}>
          <iframe
            title=""
            src="https://video.wixstatic.com/video/836da5_4108cd3f3ac343fda8cc3fcde98ff95a/1080p/mp4/file.mp4"
            allowFullScreen
            width="100%"
            height="400px"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default VideoCarousel;
