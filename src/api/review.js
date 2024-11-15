import client from "./client";

// 영화 리뷰 등록
export const postReview = async (movieId) => {
  try {
    const response = await client.post(`/cinewall/movie/${movieId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Failed to post review", error);
    throw error;
  }
};
