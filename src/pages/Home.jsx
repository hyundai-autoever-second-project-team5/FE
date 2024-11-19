import React, { useEffect } from "react";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import SwiperHeader from "../components/main/SwiperHeader";
import Spotlight from "../components/common/Spotlight";
import {
  getMovieLatest,
  getMovieLikes,
  getMoviePopular,
  getMovieRecommend,
  getMovieTrailer,
  getPowerReview,
} from "../api/main";
import { useGetComments } from "../hook/useGetComments";
import { useGetUserInfo } from "../hook/useGetUserInfo";
import { getCookie } from "../api/cookie";
import { useGetUserMovies } from "../hook/useGetUserMovies";

const Home = () => {
  const { data: userData } = useGetUserInfo(getCookie("accessToken"));
  const { data: reviews } = useGetComments();
  const { data: userMovies } = useGetUserMovies(getCookie("accessToken"));
  const [trailers, setTrailers] = React.useState([]);
  const [latests, setLatests] = React.useState([]);
  const [populars, setPopulars] = React.useState([]);
  // const [reviews, setReviews] = React.useState([]);
  const [powerReviews, setPowerReviews] = React.useState([]);
  const [userLikes, setUserLikes] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);

  useEffect(() => {
    getMovieTrailer().then((res) => {
      setTrailers(res);
    });
    getMovieLatest().then((res) => {
      setLatests(res);
    });
    getMoviePopular().then((res) => {
      setPopulars(res);
    });
    getPowerReview().then((res) => {
      setPowerReviews(res);
    });
    if (userData) {
      getMovieLikes().then((res) => {
        setUserLikes(res);
      });
    }
    getPowerReview().then((res) => {
      setPowerReviews(res);
    });
    getMovieRecommend().then((res) => {
      setRecommends(res);
    });
  }, [userData]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full m-auto">
        <Spotlight />
        <SwiperHeader data={trailers} />
        <div className="relative w-full max-w-[1400px] m-auto px-5 py-5 -mt-40 z-20 min-h-screen">
          {populars.length && (
            <SwiperCardList title={"평점순"} data={populars} rank={true} />
          )}
          {latests.length && <SwiperCardList title={"최신순"} data={latests} />}
          {recommends.length && (
            <SwiperCardList title={"추천순"} data={recommends} />
          )}
          {userMovies.length && (
            <SwiperCardList
              title={`${userData?.nickname}님의 추천`}
              data={userMovies}
            />
          )}
          {userLikes.length && (
            <SwiperCardList
              title={`${userData?.nickname}님의 찜리스트`}
              data={userLikes}
            />
          )}
          {reviews?.length && (
            <SwiperCommentList title={"최신 리뷰"} data={reviews} />
          )}
          {powerReviews.length && (
            <SwiperCommentList title={"파워 리뷰"} data={powerReviews} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
