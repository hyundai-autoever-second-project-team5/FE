import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import { detailgetMovieLatest, detailgetMoviefavorite } from "../api/detail";

const Detail = () => {
  const { id: movieId } = useParams();
  const [latests, setLatests] = React.useState([]);
  const [favor, setFavor] = React.useState([]);

  useEffect(() => {
    const fetchlatests = async () => {
        const data = await detailgetMovieLatest(movieId);
        setLatests(data);
    };

    const fetchfavor = async () => {
      const data = await detailgetMoviefavorite(movieId);
      setFavor(data);
  };
  
    if (movieId) {
      fetchlatests();
      fetchfavor();
    }
  }, [movieId]);

 
  return (
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20">
        <Info />
        <SwiperCommentList title={"최신 리뷰"} data={latests} rows={1}/>
        <SwiperCommentList title={"추천 리뷰"} data={favor} rows={1} />
        <SwiperCardList title={"추천 영화"} />
      </div>
  );
};

export default Detail;
