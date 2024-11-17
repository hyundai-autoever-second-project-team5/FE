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
import GenereSelectModal from "../components/main/GenereSelectModal";
import useModalStore from "../store/store";
import { useGetComments } from "../hook/useGetComments";

const Home = () => {
  const surveyOpen = useModalStore((state) => state.surveyOpen);
  const setSurveyOpen = useModalStore((state) => state.setSurveyOpen);
  const { data: reviews } = useGetComments();
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
    getMovieLikes().then((res) => {
      setUserLikes(res);
    });
    getPowerReview().then((res) => {
      setPowerReviews(res);
    });
    getMovieRecommend().then((res) => {
      setRecommends(res);
    });
    // getMovieReview().then((res) => {
    //   setReviews(res);
    // });
  }, []);
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
          {userLikes.length && (
            <SwiperCardList title={"효원님의 찜리스트"} data={userLikes} />
          )}
          {reviews?.length && (
            <SwiperCommentList title={"최신 댓글"} data={reviews} />
          )}
          {powerReviews.length && (
            <SwiperCommentList title={"파워 댓글"} data={powerReviews} />
          )}
        </div>
      </div>
      <GenereSelectModal
        open={surveyOpen}
        handleClose={() => setSurveyOpen(false)}
      />
    </>
  );
};

export default Home;
