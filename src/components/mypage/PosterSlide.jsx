import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoCard from "./PhotoCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";

const PosterSlide = ({ data }) => {
  const prevButtonRef = useRef(null); // 이전 버튼 참조
  const nextButtonRef = useRef(null); // 다음 버튼 참조

  return (
    <div className="relative w-full flex justify-center items-center mb-5">
      {/* 커스텀 네비게이션 버튼 */}
      <button
        ref={prevButtonRef}
        className="prev absolute flex w-10 h-10 top-1/2 -translate-y-2/4 z-10 justify-center items-center left-0 bg-[rgba(0,0,0,0.4)] rounded-full"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.86 12.837a1.155 1.155 0 0 1 0-1.674l6.545-6.316a1.259 1.259 0 0 1 1.736 0c.479.462.479 1.212 0 1.675L10.462 12l5.678 5.478c.479.463.479 1.213 0 1.675a1.26 1.26 0 0 1-1.736 0l-6.546-6.316Z"
            fill="#FFFFFF"
          ></path>
        </svg>
      </button>
      <button
        ref={nextButtonRef}
        className="next absolute flex w-10 h-10 top-1/2 -translate-y-2/4 rotate-180 z-10 justify-center items-center right-0 bg-[rgba(0,0,0,0.4)] rounded-full"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.86 12.837a1.155 1.155 0 0 1 0-1.674l6.545-6.316a1.259 1.259 0 0 1 1.736 0c.479.462.479 1.212 0 1.675L10.462 12l5.678 5.478c.479.463.479 1.213 0 1.675a1.26 1.26 0 0 1-1.736 0l-6.546-6.316Z"
            fill="#FFFFFF"
          ></path>
        </svg>
      </button>

      {/* Swiper 슬라이더 */}
      <Swiper
        modules={[Navigation, Grid]}
        slidesPerView={2}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={20}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          720: {
            slidesPerView: 3,
            grid: { rows: 2, fill: "row" },
          },
          970: {
            slidesPerView: 4,
            grid: { rows: 2, fill: "row" },
          },
          1200: {
            slidesPerView: 5,
            grid: { rows: 2, fill: "row" },
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <PhotoCard
              src={
                item.movie.posterPath ||
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEyMDVfMTkw%2FMDAxNTc1NTMzNzc4MjAw.n0N5y-fs7YRwWtogpxbHMXZtJPtI7PRptLB9UJPq7E8g._vxS1pa4Zed9jDjmlbZJ7eFTNCnUhdfUqJCH-J5Hk0gg.JPEG.skygoss11%2F1575533777927.jpg&type=sc960_832"
              }
              alt="poster"
              key={item.movie.movieId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PosterSlide;
