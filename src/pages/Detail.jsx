import React from "react";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";

const Detail = () => {
  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 pt-20 pb-5 z-20">
      <Info />
      <SwiperCommentList />
      <SwiperCardList />
    </div>
  );
};

export default Detail;
