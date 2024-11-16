import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import { detailgetMovieLatest, detailgetfavoriteMovie, detailgetsimilarMovie } from "../api/detail";

const Detail = () => {
  const { id: movieId } = useParams();
  const [latests, setLatests] = React.useState([]);
  const [favor, setFavor] = React.useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchlatests = async () => {
        const data = await detailgetMovieLatest(movieId);
        setLatests(data);
    };

    const fetchfavor = async () => {
      const data = await detailgetfavoriteMovie(movieId);
      setFavor(data);
  };

  const fetchsimilar = async () => {
    const data = await detailgetsimilarMovie(movieId);
    setSimilar(data);
  };
  
    if (movieId) {
      fetchlatests();
      fetchfavor();
      fetchsimilar();
    }
  }, [movieId]);

 
  return (
      <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20">
        <Info />
        <SwiperCommentList title={"최신 리뷰"} data={latests} rows={1}/>
        <SwiperCommentList title={"추천 리뷰"} data={favor} rows={1} />
        <SwiperCardList title={"추천 영화"} data={similar}/>
      </div>
  );
};

export default Detail;
