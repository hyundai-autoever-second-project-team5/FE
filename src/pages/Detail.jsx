import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/detail/MovieInfo";
import SwiperCardList from "../components/common/SwiperCardList";
import SwiperCommentList from "../components/common/SwiperCommentList";
import { 
  detailgetMovieLatest, 
  detailgetfavoriteMovie, 
  detailgetsimilarMovie,
} from "../api/detail";

const Detail = () => {
  const { id: movieId } = useParams();
  const [latests, setLatests] = useState([]);
  const [favor, setFavor] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const latestData = await detailgetMovieLatest(movieId);
        const favorData = await detailgetfavoriteMovie(movieId);
        setLatests(latestData);
        setFavor(favorData);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는데 실패했습니다.", error);
      }
    };

    const fetchsimilar = async () => {
      try {
        const similarData = await detailgetsimilarMovie(movieId);
        setSimilar(similarData);
      } catch (error) {
        console.error("비슷한 영화를 가져오는데 실패했습니다.", error);
      }
    };

    if (movieId) {
      fetchReviews();
      fetchsimilar();
    }
  }, [movieId]);

  // 리뷰의 좋아요 상태를 업데이트하는 함수
  const updateReviewLike = (reviewId, liked) => {
    // 최신 리뷰에서 업데이트
    setLatests((prevLatests) => 
      prevLatests.map((review) => 
        review.reviewId === reviewId 
          ? { ...review, heart: liked, heartCount: liked ? review.heartCount + 1 : review.heartCount - 1 } 
          : review
      )
    );

    // 추천 리뷰에서 업데이트
    setFavor((prevFavor) => 
      prevFavor.map((review) => 
        review.reviewId === reviewId 
          ? { ...review, heart: liked, heartCount: liked ? review.heartCount + 1 : review.heartCount - 1 } 
          : review
      )
    );
  };

  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20">
      <Info />
      <SwiperCommentList 
        title={"최신 리뷰"} 
        data={latests} 
        rows={1}
        updateLike={updateReviewLike} // 함수 전달
      />
      <SwiperCommentList 
        title={"추천 리뷰"} 
        data={favor} 
        rows={1}
        updateLike={updateReviewLike} // 함수 전달
      />
      <SwiperCardList title={"추천 영화"} data={similar}/>
    </div>
  );
};

export default Detail;