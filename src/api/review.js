import client from "./client";

// 영화 리뷰 등록
export const postReview = async (reviews) => {
  try {
    const response = await client.post(
      `/cinewall/movie/${reviews?.movieId}/reviews`,
      { rating: reviews?.rate, content: reviews?.content }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post review", error);
    throw error;
  }
};
