import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import DetailSwiperCommentList from "../components/common/DetailSwiperCommentList";
import { detailgetMovieLatest } from "../api/detail";

const Detail = () => {
  const { id: movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await detailgetMovieLatest(movieId);
        setReviews(data);
      } catch (error) {
      }
    };
  
    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);


  return (
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20">
        <Info />
        <DetailSwiperCommentList title={"리뷰"} reviews={reviews} />
        <SwiperCardList title={"추천 영화"} />
      </div>
  );
};

export default Detail;
