import client from "./client";

// export const detailgetMovieLatest = async (movieId) => {
//     try {
//       const response = await client.get(`/cinewall/review/${movieId}/reviews/latest`);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to get latest movie", error);
//       throw error;
//     }
//   };

export const detailgetMovieLatest = async (movieId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await client.get(`/cinewall/review/${movieId}/reviews/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get latest movie", error);
      throw error;
    }
  };