import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
  getFavoriteByUser,
} from "../api/mypage";
import {
  deleteFollowing,
  getFollowers,
  getFollowings,
  postFollowing,
} from "../api/follow";
import StyledWordCloud from "../components/mypage/StyledWordCloud";
import PosterSlide from "../components/mypage/PosterSlide";
import { useLocation } from "react-router-dom";
import { useGetLikeMovies } from "../hook/useGetLikeMovies";

const MyPage = () => {
  const { data } = useGetUserInfo(getCookie("accessToken"));
  console.log("리뷰 왕인지 확인하는 거 확인하려구요", data);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profileUserId = searchParams.get("userId");

  const isUser = data?.userId === profileUserId || !profileUserId;
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [followingState, setFollowingState] = React.useState(
    profileInfo?.following
  );

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
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const { data: likedMovies } = useGetLikeMovies(getCookie("accessToken"));

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleFollowerOpen = () => setFollowerOpen(true);
  const handleFollowerClose = () => setFollowerOpen(false);
  const handleFollowingOpen = () => setFollowingOpen(true);
  const handleFollowingClose = () => setFollowingOpen(false);
  const handleLikesOpen = () => setLikesOpen(true);
  const handleLikesClose = () => setLikesOpen(false);
  const handleFollowing = () => {
    if (followingState) {
      deleteFollowing(profileInfo?.userId).then((res) =>
        setFollowingState(false)
      );
    } else {
      postFollowing(profileInfo?.userId).then((res) => setFollowingState(true));
    }
  };

  useEffect(() => {
    if (isUser) {
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
      getFavoriteByUser().then((res) => {
        setFavoriteCount(res);
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
      getUserReviews(profileUserId).then((res) => {
        setMyReviews(res);
      });
      getUserStarsData(profileUserId).then((res) => {
        console.log("star", res);
        setStarsData(res);
      });
      getLikedActors(profileUserId).then((res) => {
        setActors(res);
      });
      getLikedDirectors(profileUserId).then((res) => {
        setDirectors(res);
      });
      getPosters(profileUserId).then((res) => {
        setPosters(res);
      });
      getMovieWords(profileUserId).then((res) => {
        setWords(res);
      });
      getMyPageInfo(profileUserId).then((res) => {
        setProfileInfo(res);
        setFollowingState(res?.following);
      });
    }
  }, [data?.userId, profileUserId]);

  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 pt-20 pb-5 z-20">
      {/* 프로필 섹션 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1">
            <Typography variant="h4" color="white" fontWeight={700}>
              {isUser ? data?.nickname : profileInfo?.nickname}
            </Typography>
            <Typography variant="h4" color="white">
              님의 프로필
            </Typography>
          </div>
          {isUser ? (
            // 프로필 수정 버튼
            <IconButton onClick={handleProfileOpen}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                color="white"
                style={{
                  fontSize: "24px",
                }}
              />
            </IconButton>
          ) : followingState ? (
            <Button
              variant="contained"
              sx={{ color: "black", backgroundColor: "white" }}
              onClick={handleFollowing}
            >
              팔로잉
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={handleFollowing}
            >
              팔로우
            </Button>
          )}
        </div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={
              isUser
                ? data?.profile_url ||
                  "https://blog.kakaocdn.net/dn/bfZZQd/btrua3HciZ9/jSnHklZw9ekuzV8YGLZ9zK/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84%28%EC%97%B0%EC%B4%88%EB%A1%9Dver%29.jpg?attach=1&knm=img.jpg"
                : profileInfo?.profile_url ||
                  "https://blog.kakaocdn.net/dn/bfZZQd/btrua3HciZ9/jSnHklZw9ekuzV8YGLZ9zK/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84%28%EC%97%B0%EC%B4%88%EB%A1%9Dver%29.jpg?attach=1&knm=img.jpg"
            }
            alt="profile-image"
            className="w-[140px] h-[140px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <Typography variant="h5" color="white">
              {isUser ? data?.nickname : profileInfo?.nickname}
            </Typography>
            <Typography variant="body1" color="white">
              {isUser ? data?.id : profileInfo?.id}
            </Typography>
            <Typography variant="body1" color="white">
              {isUser ? data?.email : profileInfo?.email}
            </Typography>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid w-full grid-cols-2 gap-3 mb-3 md:flex md:flex-row">
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
            <Typography variant="h4">{favoriteCount}</Typography>
            <Typography variant="h6">찜</Typography>
          </div>
        </div>
      </div>

      {/* 도표 */}
      <div className="flex flex-col w-full gap-4 md:flex-row md:gap-16">
        <div className="flex flex-col flex-grow w-full min-w-0 gap-1">
          <Typography variant="h5" fontWeight={700} color="white">
            별점 분포
          </Typography>
          <div className="w-full h-[300px] mt-2">
            <ScoreChart data={starsData} />
          </div>
        </div>
        <div className="flex flex-col flex-grow w-full min-w-0 gap-1">
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
        <div className="flex flex-col w-full max-w-full min-w-0 gap-1">
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
        <div className="flex flex-col w-full max-w-full min-w-0 gap-1">
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
      <div className="flex flex-col w-full mb-5">
        <div className="mb-4 text-2xl font-bold text-white"> 내가 수집한 포스터 </div>
        <PosterSlide data={posters} />
      </div>
      <SwiperCommentList title={"내가 작성한 리뷰"} data={myReviews} />
      <LikesModal
        open={likesOpen}
        handleClose={handleLikesClose}
        data={likedMovies}
      />
      <ProfileEditModal
        open={profileOpen}
        handleClose={handleProfileClose}
        data={data}
      />
      <FollowersModal
        title={`${isUser ? data?.nickname : profileInfo?.nickname}님의 팔로워`}
        open={followerOpen}
        handleClose={handleFollowerClose}
        data={followers}
      />
      <FollowersModal
        title={`${isUser ? data?.nickname : profileInfo?.nickname}님의 팔로잉`}
        open={followingOpen}
        handleClose={handleFollowingClose}
        data={followings}
      />
    </div>
  );
};

export default MyPage;
