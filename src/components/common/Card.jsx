import { Typography } from "@mui/material";
import React from "react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, cineScore = 9.0, netizenScore = 8.56 }) => {
  return (
    <div className="relative flex flex-col w-max-[250px] transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {/* 영화 포스터 */}
      <img
        src="https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
        alt="poster"
        className="object-cover w-full h-full"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-center text-white">
          <Rate
            allowHalf
            character={
              <FontAwesomeIcon icon={faStar} style={{ fontSize: "24px" }} />
            }
            onChange={(value) => console.log(value)} // 평점 선택 시 값이 출력되도록 설정
          />
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
  );
};

export default Card;
