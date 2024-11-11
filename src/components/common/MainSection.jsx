import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import React from "react";

const MainSection = () => {
  return (
    <div className="w-full relative h-[90vh]">
      <img
        src="https://www.10wallpaper.com/wallpaper/1366x768/1107/America_Science_Fiction_Classic_Movie_-_Avatar_HD_Wallpaper_26_1366x768.jpg"
        alt="poster"
        className="absolute w-full object-cover h-full"
      />
      {/* 배경을 위한 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" />

      {/* 실제 콘텐츠 */}
      <div className="relative z-10 px-8 py-10 flex flex-col justify-end h-full">
        <div className="flex flex-col gap-3 mb-5">
          <Typography variant="h1" fontWeight={900} color="white">
            아바타
          </Typography>
          <Typography variant="h5" color="white" sx={{ maxWidth: "580px" }}>
            무자비한 용병들이 갑작스러운 공격을 가하며 백안관을 점거한다.
            삽시간에 대혼란이 빚어진 상황. 현장에 있던 한 국회 경찰이 딸을
            구하고 대통령의 안전을 지키기 위해 위험 속으로 뛰어든다.
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FontAwesomeIcon icon={faPlay} />}
            size="large"
          >
            재생
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FontAwesomeIcon icon={faCircleInfo} />}
            size="large"
          >
            상세 정보
          </Button>
        </div>
      </div>
      {/* <img
        src="https://www.10wallpaper.com/wallpaper/1366x768/1107/America_Science_Fiction_Classic_Movie_-_Avatar_HD_Wallpaper_26_1366x768.jpg"
        alt="poster"
        className="absolute w-full object-cover h-full"
      /> */}
    </div>
  );
};

export default MainSection;
