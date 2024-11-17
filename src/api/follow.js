import client from "./client";

// 팔로잉 목록
export const getFollowings = async () => {
  try {
    const response = await client.get(`/cinewall/follow/following-list`);
    return response.data;
  } catch (error) {
    console.error("Failed to get followers", error);
    throw error;
  }
};

// 팔로워 목록
export const getFollowers = async () => {
  try {
    const response = await client.get(`/cinewall/follow/follower-list`);
    return response.data;
  } catch (error) {
    console.error("Failed to get followers", error);
    throw error;
  }
};

// 팔로워 추가
export const postFollowing = async (userId) => {
  try {
    const response = await client.post(
      `/cinewall/follow/add?to_user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add followers", error);
    throw error;
  }
};

// 팔로워 삭제
export const deleteFollowing = async (userId) => {
  try {
    const response = await client.get(
      `/cinewall/follow/delete?follower_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete followers", error);
    throw error;
  }
};
