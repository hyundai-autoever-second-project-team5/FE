import React from "react";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";

const Detail = () => {
  return (
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20">
        <Info />
        <SwiperCommentList title={"리뷰"} />
        <SwiperCardList title={"추천 영화"} />
      </div>
  );
};

export default Detail;
