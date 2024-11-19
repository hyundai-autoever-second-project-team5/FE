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

// 설문조사 영화 리스트
export const getMovieSurvey = async () => {
  try {
    const response = await client.get(`/cinewall/survey/recommend`);
    return response.data;
  } catch (error) {
    console.error("Failed to get survey movies", error);
    throw error;
  }
};

// 설문조사 제출
export const postMovieSurvey = async (genres) => {
  try {
    const response = await client.post(`/cinewall/survey/submit`, genres);
    return response.data;
  } catch (error) {
    console.error("Failed to post survey movies", error);
    throw error;
  }
};

export const getGenreTags = async () => {
  try {
    const response = await client.get(`/cinewall/recommend/hashtag`);
    return response.data;
  } catch (error) {
    console.error("Failed to get tags", error);
    throw error;
  }
};

export const getGenreMovies = async (genre) => {
  try {
    const response = await client.get(
      `/cinewall/movie/genre?genreName=${genre}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get genre movies", error);
    throw error;
  }
};

// 사용자 기반 영화추천
export const getMoviesUserbase = async () => {
  try {
    const response = await client.get(`/cinewall/movie/userbase`);
    return response.data;
  } catch (error) {
    console.error("Failed to get userbase movies", error);
    throw error;
  }
};
