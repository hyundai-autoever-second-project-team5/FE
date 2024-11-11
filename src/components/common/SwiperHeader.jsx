import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MainSection from "./MainSection";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SwiperHeader = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      modules={[Pagination]}
      className="w-full"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {Array(3)
        .fill(0)
        .map((item) => (
          <SwiperSlide>
            <MainSection />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperHeader;
