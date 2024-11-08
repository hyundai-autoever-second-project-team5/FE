import { Button } from "@mui/material";
import React from "react";

const Card = ({ title, avgScore, myScore }) => {
  return (
    <div className="flex flex-row">
      <img
        src="https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
        alt="poster"
      />
      <div className="flex flex-row">
        <Button>리뷰 쓰기</Button>
        <Button>상세 보기</Button>
      </div>
    </div>
  );
};

export default Card;
