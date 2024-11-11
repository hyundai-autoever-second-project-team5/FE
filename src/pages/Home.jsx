import React from "react";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";

const Home = () => {
  return (
    <div className="px-5 w-full max-w-[1600px] m-auto py-5">
      <SwiperCardList title={"평점순"} />
      <SwiperCardList title={"최신순"} />
      <SwiperCardList title={"추천순"} />
      <SwiperCardList title={"효원님의 찜리스트"} />
      <SwiperCommentList title={"최신 댓글"} />
    </div>
  );
};

export default Home;
