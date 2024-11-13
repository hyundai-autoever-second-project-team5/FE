import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import ScoreChart from "../components/detail/ScoreChart";
import ListItem from "../components/mypage/ListItem";
import SwiperCommentList from "../components/common/SwiperCommentList";
import ProfileEditModal from "../components/mypage/ProfileEditModal";

const MyPage = () => {
  const [open, setOpen] = React.useState(false);
  const data = [
    { name: "1점", count: 30 },
    { name: "2점", count: 50 },
    { name: "3점", count: 20 },
    { name: "4점", count: 30 },
    { name: "5점", count: 40 },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 pt-20 pb-5 z-20">
      {/* 프로필 섹션 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1">
            <Typography variant="h4" color="white" fontWeight={700}>
              효원
            </Typography>
            <Typography variant="h4" color="white">
              님의 프로필
            </Typography>
          </div>
          <IconButton onClick={handleOpen}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              color="white"
              style={{
                fontSize: "24px",
              }}
            />
          </IconButton>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://avatars.githubusercontent.com/u/89841486?v=4"
            alt="profile-image"
            className="w-[140px] h-[140px] rounded-full object-contain"
          />
          <div className="flex flex-col gap-2">
            <Typography variant="h5" color="white">
              이효원
            </Typography>
            <Typography variant="body1" color="white">
              ymj07168
            </Typography>
            <Typography variant="body1" color="white">
              ymj07168@gmail.com
            </Typography>
          </div>
        </div>
        {/* 통계 */}
        <div className="flex flex-row gap-3 w-full mb-3">
          <div className="flex flex-col w-full p-10 rounded-md bg-white bg-opacity-20 backdrop-blur-md items-center">
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">팔로워</Typography>
          </div>
          <div className="flex flex-col w-full p-10 rounded-md bg-white bg-opacity-20 backdrop-blur-md items-center">
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">코멘트</Typography>
          </div>
          <div className="flex flex-col w-full p-10 rounded-md bg-white bg-opacity-20 backdrop-blur-md items-center">
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">찜</Typography>
          </div>
        </div>
      </div>

      {/* 도표 */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="h5" fontWeight={700} color="white">
            별점 분포
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={data} />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 태그
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={data} />
          </div>
        </div>
      </div>

      {/* 선호 감독, 배우 */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full mb-8">
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 감독
          </Typography>
          <div className="w-full h-[300px] overflow-auto mt-2 flex flex-col gap-2">
            {Array(9)
              .fill(0)
              .map((item) => (
                <ListItem />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 배우
          </Typography>
          <div className="w-full h-[300px] overflow-auto mt-2 flex flex-col gap-2">
            {Array(9)
              .fill(0)
              .map((item) => (
                <ListItem />
              ))}
          </div>
        </div>
      </div>

      {/* 포스터 수집 */}
      <div className="flex flex-col bg-white bg-opacity-20 backdrop-blur-md p-3 rounded-md mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(9)
            .fill(0)
            .map((item) => (
              <div className="flex flex-col gap-1 items-center justify-center">
                <img
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEyMDVfMTkw%2FMDAxNTc1NTMzNzc4MjAw.n0N5y-fs7YRwWtogpxbHMXZtJPtI7PRptLB9UJPq7E8g._vxS1pa4Zed9jDjmlbZJ7eFTNCnUhdfUqJCH-J5Hk0gg.JPEG.skygoss11%2F1575533777927.jpg&type=sc960_832"
                  alt="poster"
                />
                <Typography variant="body1">08-21</Typography>
              </div>
            ))}
        </div>
      </div>

      <SwiperCommentList title={"최신 댓글"} />
      <ProfileEditModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default MyPage;
