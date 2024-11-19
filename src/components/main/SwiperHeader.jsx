import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MainSection from "./MainSection";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SwiperHeader = () => {
  const movieIds = [872585, 619803, 453395, 912649, 672]; // 영화 ID 리스트
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "764171d1c3361300ba5e0a4dfd3bd7da";

      // 모든 영화 데이터를 병렬로 가져오기
      const moviePromises = movieIds.map(async (movieId) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`
        );
        const movieData = await response.json();

        return {
          ...movieData,
          videoPath: `/videos/movie${movieIds.indexOf(movieId) + 1}.mp4`, // 동적 비디오 경로
        };
      });

      const allMovies = await Promise.all(moviePromises);
      setMovies(allMovies);
    };

    fetchMovies();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번 실행

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      modules={[Pagination]}
      className="w-full"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MainSection
            videoUrl={movie.videoPath} // 동적 비디오 경로 전달
            movieTitle={movie.title}
            movieOverview={movie.overview}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperHeader;
