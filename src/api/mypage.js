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
export const getLikedTags = async (userId) => {
  try {
    const response = await client.get(`/bot/${userId}/chat`);
    return response.data;
  } catch (error) {
    console.error("Failed to get directors", error);
    throw error;
  }
};
