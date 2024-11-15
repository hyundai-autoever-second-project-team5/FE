import client from "./client";

// 영화 리뷰 등록
export const postReview = async (reviews) => {
  try {
    const response = await client.post(
      `/cinewall/movie/${reviews?.id}/reviews`,
      { rating: reviews?.rate, content: reviews?.content }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post review", error);
    throw error;
  }
};

// 사용자 작성 리뷰 전체 조회
export const getUserReviews = async (userId) => {
  try {
    const response = await client.get(`/cinewall/review/user-list/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get user reviews", error);
    throw error;
  }
};

// 영화 리뷰 상세 조회
export const getReviewDetail = async (reviewId) => {
  try {
    const response = await client.get(`/cinewall/review/detail/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get review detail", error);
    throw error;
  }
};

// 사용자 별점 데이터
export const getUserStarsData = async (userId) => {
  try {
    const response = await client.get(`/cinewall/review/user-graph/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to post profile", error);
    throw error;
  }
};
