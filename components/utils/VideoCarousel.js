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
            <AspectRatio ratio={1}>
              <iframe
                title=""
                src="https://www.youtube.com/watch?v=mhE_vvwAiRc"
                allowFullScreen
              />
            </AspectRatio>
            <AspectRatio ratio={1}>
              <iframe
                title=""
                src="https://www.youtube.com/watch?v=0B3sccDYwuI"
                allowFullScreen
              />
            </AspectRatio>
            <AspectRatio ratio={1}>
              <iframe
                title=""
                src="https://www.youtube.com/watch?v=fjnovGRQrRE"
                allowFullScreen
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default VideoCarousel;
