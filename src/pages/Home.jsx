import React, { useEffect } from "react";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import SwiperHeader from "../components/main/SwiperHeader";
import Spotlight from "../components/common/Spotlight";
import {
  getMovieLatest,
  getMoviePopular,
  getMovieReview,
  getMovieTrailer,
} from "../api/main";
import { getCookie } from "../api/cookie";

const Home = () => {
  const [trailers, setTrailers] = React.useState([]);
  const [latests, setLatests] = React.useState([]);
  const [populars, setPopulars] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    getMovieTrailer().then((res) => {
      setTrailers(res);
    });
    getMovieLatest().then((res) => {
      setLatests(res);
    });
    // getMoviePopular().then((res) => {
    //   console.log(res);
    // });
    getMovieReview().then((res) => {
      setReviews(res);
    });
  }, []);
  return (
    <div className="w-full m-auto">
      <Spotlight />
      <SwiperHeader data={trailers} />
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-5 -mt-40 z-20">
        <SwiperCardList title={"평점순"} data={populars} />
        <SwiperCardList title={"최신순"} data={latests} />
        <SwiperCardList title={"추천순"} />
        <SwiperCardList title={"효원님의 찜리스트"} />
        <SwiperCommentList title={"최신 댓글"} data={reviews} />
      </div>
    </div>
  );
};

export default Home;
