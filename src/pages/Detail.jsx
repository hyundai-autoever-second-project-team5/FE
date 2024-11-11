import React from "react";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";

const Detail = () => {
  return (
    <div>
      <Info />
      <SwiperCardList/>
      <SwiperCommentList/>
      </div>
  );
};

export default Detail;