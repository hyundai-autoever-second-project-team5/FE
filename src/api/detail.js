import client from "./client";


//최신영화정보 api
export const detailgetMovieLatest = async (movieId) => {
  try {
    const response = await client.get(
      `/cinewall/review/${movieId}/reviews/latest`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get latest movie", error);
    throw error;
  }
};

//추천영화정보 api
export const detailgetfavoriteMovie = async (movieId) => {
  try {
    const response = await client.get(
      `/cinewall/review/${movieId}/reviews/favorite`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get favor movie", error);
    throw error;
  }
};

//평균 별점 api
export const detailgetMovieaverage = async (movieId) => {
  try {
    const response = await client.get(
      `/cinewall/movie/${movieId}/average-rating`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get average movie", error);
    throw error;
  }
};

//별점 분포 차트 api
  export const detailgetMoviechart = async (movieId) => {
    try {
      const response = await client.get(`/cinewall/movie/${movieId}/rating-distribution`);
      return response.data;
    } catch (error) {
      console.error("Failed to get movie chart", error);
      throw error;
    }
  };

//비슷한 영화 api
  export const detailgetsimilarMovie = async (movieId) => {
    try {
      const response = await client.get(`/cinewall/movie/${movieId}/similar-movies`);
      return response.data;
    } catch (error) {
      console.error("Failed to get similar movie", error);
      throw error;
    }
  };

// 영화 찜 추가 api
  export const detailaddMoviefavorite = async (movieId) => {
    try {
      const response = await client.post(`/cinewall/movie/${movieId}/favorite`);
      return response.data;
    } catch (error) {
      console.error("Failed to add favorite", error);
      throw error;
    }
  };

// 영화 찜 삭제 api
  export const detaildeleteMoviefavorite = async (movieId) => {
    try {
      const response = await client.delete(
        `/cinewall/movie/${movieId}/favorite`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove favorite", error);
      throw error;
    }
  };

  // 영화 찜 상태 확인 api
  export const detailgetMoviefavorite = async (movieId) => {
    try {
      const response = await client.get(`/cinewall/movie/${movieId}/favorite`);
      return response.data;
    } catch (error) {
      console.error("Failed to get favorite status", error);
      throw error;
    }
  };