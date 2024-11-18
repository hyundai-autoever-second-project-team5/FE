import client from "./client";

// 선호 배우 조회
export const getLikedActors = async (userId) => {
  try {
    const response = await client.get(`/cinewall/actor/${userId}/recommend`);
    return response.data;
  } catch (error) {
    console.error("Failed to get actors", error);
    throw error;
  }
};

// 사용자별 찜 개수
export const getFavoriteByUser = async () => {
  try {
    const response = await client.get(`/cinewall/movieFavorite/count`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get actors", error);
    throw error;
  }
};

// 선호 감독 조회
export const getLikedDirectors = async (userId) => {
  try {
    const response = await client.get(`/cinewall/crew/${userId}/recommend`);
    return response.data;
  } catch (error) {
    console.error("Failed to get directors", error);
    throw error;
  }
};

// 영화 선호 태그 조회
export const getMovieWords = async (userId) => {
  try {
    const response = await client.get(`/bot/${userId}/chat`);
    return response.data;
  } catch (error) {
    console.error("Failed to get directors", error);
    throw error;
  }
};

// 리뷰 작성한 영화 포스터 조회
export const getPosters = async (userId) => {
  try {
    const response = await client.get(`/cinewall/review/poster-list/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get posters", error);
    throw error;
  }
};

// 다른 사람 마이페이지 정보 조회
export const getMyPageInfo = async (userId) => {
  try {
    const response = await client.get(`/cinewall/user/${userId}/mypage`);
    return response.data;
  } catch (error) {
    console.error("Failed to get mypage", error);
    throw error;
  }
};
