import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ScoreChart from "../components/detail/ScoreChart";
import ListItem from "../components/mypage/ListItem";
import SwiperCommentList from "../components/common/SwiperCommentList";
import ProfileEditModal from "../components/mypage/ProfileEditModal";
import FollowersModal from "../components/mypage/FollowersModal";
import LikesModal from "../components/mypage/LikesModal";
import PhotoCard from "../components/mypage/PhotoCard";
import { getUserReviews, getUserStarsData } from "../api/review";
import { useGetUserInfo } from "../hook/useGetUserInfo";
import { getCookie } from "../api/cookie";
import { getLikedActors, getLikedDirectors } from "../api/mypage";

const MyPage = () => {
  const { data } = useGetUserInfo(getCookie("accessToken"));
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [followerOpen, setFollowerOpen] = React.useState(false);
  const [likesOpen, setLikesOpen] = React.useState(false);
  const [myReviews, setMyReviews] = React.useState([]);
  const [starsData, setStarsData] = React.useState([]);
  const [actors, setActors] = React.useState([]);
  const [directors, setDirectors] = React.useState([]);

  // const starData = [
  //   { score: "1점", count: 30 },
  //   { score: "2점", count: 50 },
  //   { score: "3점", count: 20 },
  //   { score: "4점", count: 30 },
  //   { score: "5점", count: 40 },
  // ];

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleFollowerOpen = () => setFollowerOpen(true);
  const handleFollowerClose = () => setFollowerOpen(false);
  const handleLikesOpen = () => setLikesOpen(true);
  const handleLikesClose = () => setLikesOpen(false);

  useEffect(() => {
    getUserReviews(data?.userId).then((res) => {
      setMyReviews(res);
    });
    getUserStarsData(data?.userId).then((res) => {
      console.log("star", res);
      setStarsData(res);
    });
    getLikedActors(data?.userId).then((res) => {
      setActors(res);
    });
    getLikedDirectors(data?.userId).then((res) => {
      setDirectors(res);
    });
  }, [data?.userId]);

  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 pt-20 pb-5 z-20">
      {/* 프로필 섹션 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1">
            <Typography variant="h4" color="white" fontWeight={700}>
              {data?.nickname}
            </Typography>
            <Typography variant="h4" color="white">
              님의 프로필
            </Typography>
          </div>
          <IconButton onClick={handleProfileOpen}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              color="white"
              style={{
                fontSize: "24px",
              }}
            />
          </IconButton>
        </div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={
              data?.profile_url ||
              "https://avatars.githubusercontent.com/u/89841486?v=4"
            }
            alt="profile-image"
            className="w-[140px] h-[140px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <Typography variant="h5" color="white">
              {data?.nickname}
            </Typography>
            <Typography variant="body1" color="white">
              {data?.id}
            </Typography>
            <Typography variant="body1" color="white">
              {data?.email}
            </Typography>
          </div>
        </div>
        {/* 통계 */}
        <div className="flex flex-row w-full gap-3 mb-3">
          <div
            className="flex flex-col items-center w-full p-10 bg-white rounded-md cursor-pointer bg-opacity-20 backdrop-blur-md"
            onClick={handleFollowerOpen}
          >
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">팔로워</Typography>
          </div>
          <div className="flex flex-col items-center w-full p-10 bg-white rounded-md bg-opacity-20 backdrop-blur-md">
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">코멘트</Typography>
          </div>
          <div
            className="flex flex-col items-center w-full p-10 bg-white rounded-md cursor-pointer bg-opacity-20 backdrop-blur-md"
            onClick={handleLikesOpen}
          >
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">찜</Typography>
          </div>
        </div>
      </div>

      {/* 도표 */}
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:gap-16">
        <div className="flex flex-col w-full gap-1">
          <Typography variant="h5" fontWeight={700} color="white">
            별점 분포
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={starsData} />
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 태그
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={starsData} />
          </div>
        </div>
      </div>

      {/* 선호 감독, 배우 */}
      <div className="flex flex-col w-full gap-4 mb-8 lg:flex-row sm:gap-16">
        <div className="flex flex-col w-full gap-1">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 감독
          </Typography>
          <div className="w-full h-[300px] overflow-auto mt-2 flex flex-col gap-2">
            {directors?.map((item) => (
              <ListItem
                id={item.id}
                name={item.name}
                profile={item.profilePath}
                score={item.score}
                movies={item.movies}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 배우
          </Typography>
          <div className="w-full h-[300px] overflow-auto mt-2 flex flex-col gap-2">
            {actors?.map((item) => (
              <ListItem
                id={item.crewId}
                name={item.actorName}
                profile={item.profilePath}
                score={item.score}
                movies={item.movies}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 포스터 수집 */}
      <div className="flex flex-col p-3 mb-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array(9)
            .fill(0)
            .map((item, index) => (
              <PhotoCard
                src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEyMDVfMTkw%2FMDAxNTc1NTMzNzc4MjAw.n0N5y-fs7YRwWtogpxbHMXZtJPtI7PRptLB9UJPq7E8g._vxS1pa4Zed9jDjmlbZJ7eFTNCnUhdfUqJCH-J5Hk0gg.JPEG.skygoss11%2F1575533777927.jpg&type=sc960_832"
                alt="poster"
              />
            ))}
        </div>
      </div>
      <SwiperCommentList title={"내가 작성한 댓글"} data={myReviews} />
      <LikesModal open={likesOpen} handleClose={handleLikesClose} />
      <ProfileEditModal
        open={profileOpen}
        handleClose={handleProfileClose}
        data={data}
      />
      <FollowersModal open={followerOpen} handleClose={handleFollowerClose} />
    </div>
  );
};

export default MyPage;
