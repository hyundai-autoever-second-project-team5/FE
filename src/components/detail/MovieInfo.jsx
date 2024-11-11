import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieInfo = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = '764171d1c3361300ba5e0a4dfd3bd7da'; 

      console.log('요청하는 movieId:', movieId); // movieId 값 확인

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`
      );
      
      const data = await response.json();
      setMovie(data);
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (!movie) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='px-10 py-8'>
      <div className="flex">
        <div className="relative w-2/6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 포스터`}
          />
          {/* <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black to-transparent"></div> */}
        </div>
        <div className="w-2/4 mx-7">
          <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center justify-between mb-2 ">
            <strong>| 개봉일: {movie.release_date || '정보 없음'}</strong>
            <strong>| 평점: {movie.vote_average || '정보 없음'}</strong>
            <strong>| 러닝타임: {movie.runtime ? `${movie.runtime}분` : '정보 없음'}</strong>
          </div>
          <div className="mb-4">
            <strong>| 장르: </strong>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join('/ ')
              : '정보 없음'}
          </div>
          <div>
            <div className='mb-2 text-2xl font-extrabold'>{movie.tagline}</div>
            <p>{movie.overview || '줄거리 정보가 없습니다.'}</p>
          </div>
        </div>
      </div>
      <strong className="block mt-4">출연진</strong>
    </div>
  );
};

export default MovieInfo;