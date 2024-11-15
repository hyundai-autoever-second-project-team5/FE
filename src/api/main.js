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
    const response = await client.get("/cinewall/movie/popular");
    return response.data;
  } catch (error) {
    console.error("Failed to get popular movie", error);
    throw error;
  }
};

// 찜 목록
export const getMovieLikes = async () => {
  try {
    const response = await client.get("/cinewall/movie/favorite");
    return response.data;
  } catch (error) {
    console.error("Failed to get favorite movie", error);
    throw error;
  }
};

// 평점순 영화
export const getMovieRecommend = async () => {
  try {
    const response = await client.get("/cinewall/movie/recommend");
    return response.data;
  } catch (error) {
    console.error("Failed to get recommended movie", error);
    throw error;
  }
};

// 파워 리뷰 리스트
export const getPowerReview = async () => {
  try {
    const response = await client.get("/cinewall/movie/powerReview");
    return response.data;
  } catch (error) {
    console.error("Failed to get power review", error);
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

// 영화 제목 검색
export const getMovieSearch = async (title) => {
  try {
    const response = await client.get(`/cinewall/movie/search?title=${title}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get searched movie", error);
    throw error;
  }
};
