import { useQuery } from "@tanstack/react-query";
import { detailgetMovieLatest } from "../api/detail";
import { useParams } from "react-router-dom";

export const useGetDetailLatestReviews = () => {
  const { id: movieId } = useParams();
  const queryKey = ["latest-comments", movieId];

  const queryFn = async () => {
    try {
      if (movieId) {
        const response = await detailgetMovieLatest(movieId);
        if (!response || response.error) {
          throw new Error(response?.message || "Failed to fetch comments");
        }
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error("Latest Review Query failed:", error.message);
    },
    enabled: true,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
