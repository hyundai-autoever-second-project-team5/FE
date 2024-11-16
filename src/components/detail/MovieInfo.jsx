import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import ScoreChart from "./ScoreChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen } from "@fortawesome/free-solid-svg-icons";
import ShareIconButton from "../common/ShareIconButton";
import ReviewModal from "../common/ReviewModal";
import { detailgetMovieaverage, detailgetMoviechart } from "../../api/detail";

const MovieInfo = () => {
  
  //영화 ID
  const { id: movieId } = useParams();
  //영화 정보
  const [movie, setMovie] = useState(null);
  //출연진
  const [cast, setCast] = useState([]);
  //리뷰모달
  const [open, setOpen] = React.useState(false);
  //평균 별점
  const [average, setAverage] = React.useState([]);
  //별점 분포 차트
  const [chart, setChart] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = "764171d1c3361300ba5e0a4dfd3bd7da";

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`
      );

      const moviedata = await response.json();
      setMovie(moviedata);

      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=ko-KR`
      );

      const castData = await castResponse.json();
      setCast(castData.cast);
    };

    const fetchaverage = async () => {
      const data = await detailgetMovieaverage(movieId);
      setAverage(data);
  };

  const fetchchart = async () => {
    const data = await detailgetMoviechart(movieId);
    setChart(data);
};
    if (movieId) {
      fetchMovie();
      fetchaverage();
      fetchchart();
    }
  }, [movieId]);

  if (!movie) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="text-gray-200 ">
        <div className="flex flex-col items-start justify-start sm:flex-row">
          {/* 영화 포스터 */}
          <div className="relative w-full sm:max-w-[180px] md:max-w-[250px] lg:max-w-[350px] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              className="w-full"
            />
            <div className="absolute inset-0 w-full bg-gradient-to-l from-black to-transparent"></div>
          </div>
          {/* 영화 정보 */}
          <div className="w-full mt-3 sm:mt-0 sm:pl-8">
            <div className="flex flex-row items-center justify-between w-full">
              <Typography variant="h2" fontWeight={800}>
                {movie.title}
              </Typography>
              <div className="flex flex-row gap-1">
                <Tooltip title="리뷰작성" arrow onClick={handleOpen}>
                  <IconButton color="inherit">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ fontSize: "24px" }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="찜" arrow>
                  <IconButton color="inherit">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ fontSize: "24px" }}
                    />
                  </IconButton>
                </Tooltip>
                <ShareIconButton />
              </div>
            </div>
            <div className="flex flex-row gap-8 mb-2 sm:gap-8 md:gap-16">
              <strong>| 개봉일: {movie.release_date || "정보 없음"}</strong>
              <strong>| 평점: {average || "정보 없음"}</strong>
              <strong>
                | 러닝타임: {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
              </strong>
            </div>
            <div className="mb-4">
              <strong>| 장르: </strong>
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map((genre) => genre.name).join("/ ")
                : "정보 없음"}
            </div>
            <div className="mb-2 text-2xl font-extrabold">{movie.tagline}</div>
            <p className="mb-4">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
            <div className="w-full h-[300px] lg:max-w-[700px] lg:h-[400px]">
              <ScoreChart data={chart} />
            </div>
          </div>
        </div>
        <strong className="block my-4 text-xl">출연진</strong>
        <div className="flex items-center mb-4 overflow-x-auto">
          {cast?.slice(0, 5).map((actor) => (
            <div
              key={actor.cast_id}
              className="flex flex-col items-center text-center min-w-[120px]"
            >
              <div className="flex justify-center w-full">
                <Avatar
                  alt={actor.name}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  sx={{ width: 70, height: 70 }}
                  className="mb-2"
                />
              </div>
              <div className="w-full truncate">{actor.name}</div>
              <div className="w-full text-sm text-gray-400 truncate">
                {actor.character}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReviewModal open={open} handleClose={handleClose} />
    </>
  );
};

export default MovieInfo;
