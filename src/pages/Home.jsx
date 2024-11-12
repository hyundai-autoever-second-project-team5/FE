import React from "react";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import SwiperHeader from "../components/main/SwiperHeader";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <SwiperHeader />
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-5 -mt-40 z-20">
        <SwiperCardList title={"평점순"} />
        <SwiperCardList title={"최신순"} />
        <SwiperCardList title={"추천순"} />
        <SwiperCardList title={"효원님의 찜리스트"} />
        <SwiperCommentList title={"최신 댓글"} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
