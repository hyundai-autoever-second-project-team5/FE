import client from "./client";

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

export const detailgetMoviefavorite = async (movieId) => {
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

//차트 효원 이거 좀!
export const detailgetMoviechart = async (movieId) => {
  try {
    const response = await client.get(
      `/cinewall/movie/${movieId}/rating-distribution`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get chart movie", error);
    throw error;
  }
};
