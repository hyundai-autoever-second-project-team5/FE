import { Button, Typography } from "@mui/material";
import React from "react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Card.css"; // 추가한 CSS 파일을 가져옵니다

const Card = ({ title, cineScore = 9.0, netizenScore = 8.56 }) => {
  return (
    <div className="card-wrapper">
      {/* 전구 효과 */}
      <div className="light z-50"></div>

      <div className="card relative flex flex-col w-full transform transition duration-300 hover:scale-105">
        {/* 영화 포스터 */}
        <img
          src="https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
          alt="poster"
          className="object-cover w-full h-full"
        />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
          {/* 상단 평점 */}
          <div className="flex flex-col justify-center items-center contents-center h-full w-full">
            <Rate
              allowHalf
              character={
                <FontAwesomeIcon icon={faStar} style={{ fontSize: "24px" }} />
              }
              onChange={(value) => console.log(value)}
            />
          </div>
          {/* 하단 버튼들 */}
          <div className="flex flex-row justify-center w-full mt-auto z-50 bg-slate-300 py-2">
            <Button variant="text" color="inherit" className="w-full h-full">
              리뷰쓰기
            </Button>
            <Button variant="text" color="inherit" className="w-full h-full">
              상세보기
            </Button>
          </div>
        </div>

        {/* 평점 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 py-2 flex justify-around items-center">
          <div className="flex flex-col items-center text-white">
            <Typography variant="body2" color="inherit">
              평점
            </Typography>
            <Typography variant="h6" color="error">
              {cineScore.toFixed(2)}
            </Typography>
          </div>
          <div className="flex flex-col items-center text-white">
            <Typography variant="body2" color="inherit">
              내 평점
            </Typography>
            <Typography variant="h6" color="error">
              {netizenScore.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
