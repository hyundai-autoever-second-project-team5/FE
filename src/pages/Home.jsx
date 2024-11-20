import React, { useEffect } from "react";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import SwiperHeader from "../components/main/SwiperHeader";
import Spotlight from "../components/common/Spotlight";
import {
  getMovieRecommend,
  getMovieTrailer,
  getPowerReview,
} from "../api/main";
import { useGetComments } from "../hook/useGetComments";
import { useGetUserInfo } from "../hook/useGetUserInfo";
import { getCookie } from "../api/cookie";
import { useGetUserMovies } from "../hook/useGetUserMovies";
import { useGetLatestMovies } from "../hook/useGetLatestMovies";
import { useGetPopularMovies } from "../hook/useGetPopularMovies";
import { useGetLikeMovies } from "../hook/useGetLikeMovies";

const Home = () => {
  const { data: userData } = useGetUserInfo(getCookie("accessToken"));
  const { data: userLikes } = useGetLikeMovies(getCookie("accessToken"));
  const { data: userMovies } = useGetUserMovies(getCookie("accessToken"));
  const { data: latests } = useGetLatestMovies();
  const { data: populars } = useGetPopularMovies();
  const { data: reviews } = useGetComments();

  const [trailers, setTrailers] = React.useState([]);
  const [powerReviews, setPowerReviews] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);

  useEffect(() => {
    getMovieTrailer().then((res) => {
      setTrailers(res);
    });
    getPowerReview().then((res) => {
      setPowerReviews(res);
    });
    getMovieRecommend().then((res) => {
      setRecommends(res);
    });
  }, [userData]);

  return (
    <>
      <div className="w-full m-auto">
        <Spotlight />
        <SwiperHeader data={trailers} />
        <div className="relative w-full max-w-[1400px] m-auto px-5 py-5 -mt-40 z-20 min-h-screen">
          {populars && populars?.length && (
            <SwiperCardList title={"평점순"} data={populars} rank={true} />
          )}
          {latests && latests?.length && (
            <SwiperCardList title={"최신순"} data={latests} />
          )}
          {recommends.length && (
            <SwiperCardList title={"추천순"} data={recommends} />
          )}
          {userMovies && userMovies?.length && (
            <SwiperCardList
              title={`${userData?.nickname}님 이런 영화는 어때요?`}
              data={userMovies}
            />
          )}
          {userLikes && userLikes?.length && (
            <SwiperCardList
              title={`${userData?.nickname}님의 찜리스트`}
              data={userLikes}
            />
          )}
          {reviews?.length && (
            <SwiperCommentList title={"최신 리뷰"} data={reviews} />
          )}
          {powerReviews?.length && (
            <SwiperCommentList title={"파워 리뷰"} data={powerReviews} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
