import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Typography } from "@mui/material";
import Card from "./Card/Card";

const SwiperCardList = ({ title, data }) => {
  return (
    <>
      {/* 평점순 */}
      <Typography variant="h4" color="white" fontWeight={700}>
        {title}
      </Typography>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        modules={[Pagination]}
        className="mb-8"
      >
        {Array(9)
          .fill(0)
          .map((item) => (
            <SwiperSlide>
              <Card
                posterSrc={
                  "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F11%2Fmarvel-reportedly-considering-reassembling-original-six-avengers-actors-for-new-film-info-1.jpg?q=75&w=800&cbr=1&fit=max"
                }
                avgScore={3.5}
                myScore={5}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperCardList;
