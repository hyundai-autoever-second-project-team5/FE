import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScoreChart from "../components/detail/ScoreChart";
import ListItem from "../components/mypage/ListItem";
import SwiperCommentList from "../components/common/SwiperCommentList";
import ProfileEditModal from "../components/mypage/ProfileEditModal";
import FollowersModal from "../components/mypage/FollowersModal";
import LikesModal from "../components/mypage/LikesModal";
import { getUserReviews, getUserStarsData } from "../api/review";
import { useGetUserInfo } from "../hook/useGetUserInfo";
import { getCookie } from "../api/cookie";
import {
  getLikedActors,
  getLikedDirectors,
  getMovieWords,
  getMyPageInfo,
  getPosters,
} from "../api/mypage";
import { getFollowers, getFollowings } from "../api/follow";
import StyledWordCloud from "../components/mypage/StyledWordCloud";
import PosterSlide from "../components/mypage/PosterSlide";
import { useLocation } from "react-router-dom";

const MyPage = () => {
  const { data } = useGetUserInfo(getCookie("accessToken"));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profileUserId = searchParams.get("userId");

  const [profileInfo, setProfileInfo] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [followingOpen, setFollowingOpen] = React.useState(false);
  const [followerOpen, setFollowerOpen] = React.useState(false);
  const [likesOpen, setLikesOpen] = React.useState(false);
  const [myReviews, setMyReviews] = React.useState([]);
  const [starsData, setStarsData] = React.useState([]);
  const [actors, setActors] = React.useState([]);
  const [directors, setDirectors] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [followings, setFollowings] = React.useState([]);
  const [posters, setPosters] = React.useState([]);
  const [words, setWords] = React.useState([]);

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleFollowerOpen = () => setFollowerOpen(true);
  const handleFollowerClose = () => setFollowerOpen(false);
  const handleFollowingOpen = () => setFollowingOpen(true);
  const handleFollowingClose = () => setFollowingOpen(false);
  const handleLikesOpen = () => setLikesOpen(true);
  const handleLikesClose = () => setLikesOpen(false);

  useEffect(() => {
    if (!profileUserId || Number(profileUserId) === data?.userId) {
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
      getFollowers().then((res) => {
        setFollowers(res.body);
      });
      getFollowings().then((res) => {
        setFollowings(res.body);
      });
      getPosters(data?.userId).then((res) => {
        setPosters(res);
      });
      getMovieWords(data?.userId).then((res) => {
        setWords(res);
      });
    } else {
      getMyPageInfo(profileUserId).then((res) => setProfileInfo(res));
    }
  }, [data?.userId, profileUserId]);

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
        <div className="grid grid-cols-2 md:flex md:flex-row w-full gap-3 mb-3">
          <div
            className="flex flex-col items-center w-full p-10 bg-white rounded-md cursor-pointer bg-opacity-20 backdrop-blur-md"
            onClick={handleFollowingOpen}
          >
            <Typography variant="h4">{followings?.length}</Typography>
            <Typography variant="h6">팔로잉</Typography>
          </div>
          <div
            className="flex flex-col items-center w-full p-10 bg-white rounded-md cursor-pointer bg-opacity-20 backdrop-blur-md"
            onClick={handleFollowerOpen}
          >
            <Typography variant="h4">{followers?.length}</Typography>
            <Typography variant="h6">팔로워</Typography>
          </div>
          <div className="flex flex-col items-center w-full p-10 bg-white rounded-md bg-opacity-20 backdrop-blur-md">
            <Typography variant="h4">{myReviews?.length}</Typography>
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
      <div className="flex flex-col w-full gap-4 md:flex-row md:gap-16">
        <div className="flex flex-col w-full gap-1 flex-grow min-w-0">
          <Typography variant="h5" fontWeight={700} color="white">
            별점 분포
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={starsData} />
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 flex-grow min-w-0">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 태그
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <StyledWordCloud words={words} />
          </div>
        </div>
      </div>

      {/* 선호 감독, 배우 */}
      <div className="flex flex-col w-full gap-4 mb-8 lg:flex-row lg:gap-16">
        <div className="flex flex-col w-full max-w-full gap-1 min-w-0">
          <Typography variant="h5" fontWeight={700} color="white">
            선호 감독
          </Typography>
          <div className="w-full h-[250px] overflow-auto mt-2 flex flex-col gap-2 lg:h-[300px]">
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
        <div className="flex flex-col w-full max-w-full gap-1 min-w-0">
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
      <div className="flex flex-col mb-5 w-full">
        <PosterSlide data={posters} />
      </div>
      <SwiperCommentList title={"내가 작성한 댓글"} data={myReviews} />
      <LikesModal open={likesOpen} handleClose={handleLikesClose} />
      <ProfileEditModal
        open={profileOpen}
        handleClose={handleProfileClose}
        data={data}
      />
      <FollowersModal
        title={`${data?.nickname}님의 팔로워`}
        open={followerOpen}
        handleClose={handleFollowerClose}
        data={followers}
      />
      <FollowersModal
        title={`${data?.nickname}님의 팔로잉`}
        open={followingOpen}
        handleClose={handleFollowingClose}
        data={followings}
      />
    </div>
  );
};

export default MyPage;
