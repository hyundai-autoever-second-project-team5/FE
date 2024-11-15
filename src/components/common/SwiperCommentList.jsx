import { Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import Comment from "./Comment";

const SwiperCommentList = ({ title, data }) => {
  return (
    <div className="mb-5 text-white">
      <Typography
        variant="h5"
        color="white"
        fontWeight={700}
        style={{ marginBottom: "16px" }}
      >
        {title}
      </Typography>
      <Swiper
        slidesPerView={1}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={20}
        modules={[Grid, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            grid: { rows: 2, fill: "row" },
          },
          1024: {
            slidesPerView: 3,
            grid: { rows: 2, fill: "row" },
          },
          1200: {
            slidesPerView: 4,
            grid: { rows: 2, fill: "row" },
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide>
            <Comment
              id={item.review_id}
              profileSrc={item.profile_url}
              writer={item.nickname}
              title={item.movie_title}
              content={item.content}
              score={item.score}
              posterSrc={item.poster_path}
              likes={item.heart_count}
              // comments={item.comments}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCommentList;
