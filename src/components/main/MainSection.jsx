import {
  faCircleInfo,
  faMagnifyingGlass,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import React from "react";
import { getUserInfo } from "../../api/user";

const MainSection = ({ videoUrl, movieTitle, movieOverview }) => {
  const handleGetInfo = () => {
    getUserInfo().then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="relative w-full h-screen">
      {/* 비디오 렌더링 */}
      <video
        src={videoUrl} // 동적 비디오 경로
        alt="poster"
        className="absolute object-cover w-full h-full mask-image-gradient"
        autoPlay
        muted
        loop
      />

      {/* 반투명 배경 */}
      <div className="absolute inset-0 bg-black opacity-50 mask-image-gradient"></div>

      {/* 영화 콘텐츠 */}
      <div className="relative z-10 px-5 m-auto max-w-[1400px] flex flex-col justify-center h-full">
        <div className="flex flex-col gap-3 mb-5">
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">
            {movieTitle}
          </div>
          <div className="text-lg md:text-xl lg:text-2xl text-white max-w-[580px]">
            {movieOverview}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            size="large"
          >
            재생
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FontAwesomeIcon icon={faCircleInfo} />}
            size="large"
            onClick={handleGetInfo}
          >
            상세 정보
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
