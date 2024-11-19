import { Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import Comment from "./Comment";

const SwiperCommentList = ({ title, data, rows = 2, updateLike }) => {
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
        grid={{ rows: rows, fill: "row" }}
        spaceBetween={20}
        modules={[Grid, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            grid: { rows: rows, fill: "row" },
          },
          1024: {
            slidesPerView: 3,
            grid: { rows: rows, fill: "row" },
          },
          1200: {
            slidesPerView: 4,
            grid: { rows: rows, fill: "row" },
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item?.reviewId}>
            <Comment
              id={item?.reviewId}
              profileSrc={item?.profileUrl || item?.user?.profile_url}
              writerId={item?.userId || item?.user?.id}
              writer={item?.nickname || item?.user?.nickname}
              title={item?.title}
              content={item?.content}
              score={item?.rating}
              posterSrc={item?.posterPath || item?.movie?.posterPath}
              likes={item?.heartCount}
              heart={item?.heart}
              updateLike={updateLike}
              reviewId={item?.reviewId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCommentList;
