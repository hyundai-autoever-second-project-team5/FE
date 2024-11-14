import client from "./client";

// 예고편 영상 조회
export const getMovieTrailer = async () => {
  try {
    const response = await client.get("/cinewall/movie/trailer");
    return response.data;
  } catch (error) {
    console.error("Failed to get movie trailer", error);
    throw error;
  }
};

// 최신순 영화
export const getMovieLatest = async () => {
  try {
    const response = await client.get("/cinewall/movie/latest");
    return response.data;
  } catch (error) {
    console.error("Failed to get latest movie", error);
    throw error;
  }
};

// 평점순 영화
export const getMoviePopular = async () => {
  try {
    const response = await client.get("/cinewall/movie/poplular");
    return response.data;
  } catch (error) {
    console.error("Failed to get popular movie", error);
    throw error;
  }
};

// 최신순 댓글
export const getMovieReview = async () => {
  try {
    const response = await client.get("/cinewall/movie/review");
    return response.data;
  } catch (error) {
    console.error("Failed to get movie reviews", error);
    throw error;
  }
};
