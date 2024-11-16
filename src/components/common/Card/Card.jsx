import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Card.css"; // 추가한 CSS 파일을 가져옵니다
import ReviewModal from "../ReviewModal";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  title,
  posterSrc,
  avgScore = 9.0,
  myScore = 0,
  order = 1,
}) => {
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [newMyScore, setNewMyScore] = React.useState(myScore);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewMyScore(false);
  };

  // 모달이 열릴 때 스크롤 비활성화, 닫힐 때 복구
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <div className="card-wrapper group" id={id}>
        {/* 전구 효과 */}
        <div className="z-50 light"></div>
        <div className="relative flex flex-col w-full transition duration-300 transform rounded-md card hover:scale-105">
          {order && (
            <div className="absolute top-1 left-1 w-[40px] h-[40px]  bg-black rounded-md flex items-center justify-center bg-opacity-70 backdrop-blur-md">
              <Typography variant="h6" fontWeight={800} color="white">
                1
              </Typography>
            </div>
          )}
          {/* 영화 포스터 */}
          <img
            src={posterSrc}
            alt="poster"
            className="object-cover rounded-md w-full h-[500px] sm:h-[400px] md:h-[350px]"
          />
          {/* 오버레이 */}

          {/* 오버레이 */}
          <div className="absolute inset-0 z-40 flex flex-col items-center p-4 transition-all duration-500 rounded-md opacity-0 bg-black/80 backdrop-blur-sm hover:opacity-100">
            {/* 상단 평점 */}
            <div className="flex flex-col items-center justify-center w-full h-full contents-center">
              <Rate
                value={myScore}
                allowHalf
                character={
                  <FontAwesomeIcon icon={faStar} style={{ fontSize: "24px" }} />
                }
                onChange={(value) => {
                  setNewMyScore(value);
                  setOpen(true);
                }}
              />
            </div>
            {/* 하단 버튼들 */}
            <div className="z-50 flex flex-row justify-center w-full py-1 mt-auto transition-transform duration-500 translate-y-full rounded-md bg-white/50 backdrop-blur-md group-hover:translate-y-0">
              <Button
                variant="text"
                color="inherit"
                className="w-full h-full text-white hover:bg-white/30"
                onClick={handleOpen}
              >
                리뷰쓰기
              </Button>
              <Button
                variant="text"
                color="inherit"
                className="w-full h-full text-white hover:bg-white/30"
                onClick={() => navigation(`/detail/238`)}
              >
                상세보기
              </Button>
            </div>
          </div>

          {/* 평점 오버레이 */}
          <div className="absolute bottom-0 left-0 z-10 flex items-center justify-around w-full py-2 bg-black rounded-b-md bg-opacity-70 ">
            <div className="flex flex-col items-center text-white">
              <Typography variant="body2" color="inherit">
                평점
              </Typography>
              <Typography variant="h6" color="error">
                {avgScore.toFixed(2)}
              </Typography>
            </div>
            <div className="flex flex-col items-center text-white">
              <Typography variant="body2" color="inherit">
                내 평점
              </Typography>
              <Typography variant="h6" color="error">
                {myScore.toFixed(2)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        open={open}
        handleClose={handleClose}
        rate={newMyScore}
        movieId={id}
        movieTitle={title}
        posterSrc={posterSrc}
      />
    </>
  );
};

export default Card;
