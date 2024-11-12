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
  const commentDummy = {
    profileSrc: "https://avatars.githubusercontent.com/u/89841486?v=4",
    writer: "이효원",
    title: "베놈: 라스트 댄스",
    content: "이게 무슨 씨알메리야",
    score: 3.5,
    posterSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XrRIlcKcoFd9x-_k6LnatWLr30TvK_20_Q&s",
    likes: 5,
    comments: 3,
  };

  return (
    <>
      <Typography
        variant="h4"
        color="white"
        fontWeight={700}
        sx={{ marginBottom: "20px" }}
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
        {Array(9)
          .fill(commentDummy)
          .map((item) => (
            <SwiperSlide>
              <Comment
                profileSrc={item.profileSrc}
                writer={item.writer}
                title={item.title}
                content={item.content}
                score={item.score}
                posterSrc={item.posterSrc}
                likes={item.likes}
                comments={item.comments}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperCommentList;
