import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MainSection from "./MainSection";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SwiperHeader = ({ data = [] }) => {
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
      {data?.map((item) => {
        const url = item.trailer_path.split("=")[1];
        console.log(url);
        return (
          <SwiperSlide>
            <MainSection
              videoUrl={`https://www.youtube.com/embed/${url}?autoplay=1&mute=1&loop=1&playlist=${url}&controls=0&modestbranding=1&showinfo=0&rel=0`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperHeader;
