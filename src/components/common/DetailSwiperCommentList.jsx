import { Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import Comment from "./Comment";

const DetailSwiperCommentList = ({ title, reviews }) => {

  return (
    <div className="text-white">
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
        {reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <Comment
              id={review.reviewId}
              profileSrc={review.profileUrl}
              writer={review.nickname}
              title={review.movieTitle}
              content={review.content}
              score={review.score}
              posterSrc={review.posterPath}
              likes={review.likeCount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailSwiperCommentList;
