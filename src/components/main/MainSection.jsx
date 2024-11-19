import React, { useState, useRef, useEffect } from "react";
import {
  faCircleInfo,
  faMagnifyingGlass,
  faPlay,
  faPause, // 새로 추가: 정지 아이콘
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { getUserInfo } from "../../api/user";

const MainSection = ({ videoUrl, movieTitle, movieOverview }) => {
  const [isPlaying, setIsPlaying] = useState(true); // 비디오의 초기 상태는 '재생'으로 설정
  const videoRef = useRef(null); // 비디오 DOM 요소에 접근

  const handleGetInfo = () => {
    getUserInfo().then((res) => {
      console.log(res);
    });
  };

  // 비디오 상태가 변경되면, 자동으로 재생/정지 설정
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play(); // 재생
      } else {
        videoRef.current.pause(); // 정지
      }
    }
  }, [isPlaying]); // isPlaying 상태가 변경될 때마다 실행

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying); // 상태 반전 (재생/정지)
  };

  return (
    <div className="relative w-full h-screen">
      {/* 비디오 렌더링 */}
      <video
        ref={videoRef} // 비디오 DOM 요소에 접근하기 위해 useRef 사용
        src={videoUrl} // 동적 비디오 경로
        alt="poster"
        className="absolute object-cover w-full h-full mask-image-gradient"
        muted
        loop
        autoPlay // 초기 로드시 자동으로 재생
      />

      {/* 반투명 배경 */}
      <div className="absolute inset-0 bg-black opacity-50 mask-image-gradient"></div>

      <div className="relative z-10 px-5 m-auto max-w-[1400px] flex flex-col justify-center h-full">
        <div className="flex flex-col gap-3 mb-5">
          {/* 제목 스타일 수정 */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {movieTitle}
          </div>

          {/* 개요 스타일 수정: 최대 3줄 표시 */}
          <div
            className="text-base md:text-lg lg:text-xl text-white max-w-[580px] overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // 최대 3줄로 제한
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            }}
            title={movieOverview} // 툴팁에 전체 텍스트 표시
          >
            {movieOverview}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {/* 재생/정지 버튼 */}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />} // 아이콘 변경
            size="large"
            onClick={togglePlayPause} // 클릭 시 재생/정지
          >
            {isPlaying ? "정지" : "재생"} {/* 상태에 따라 버튼 텍스트 변경 */}
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
