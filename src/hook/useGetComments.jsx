import { useQuery } from "@tanstack/react-query";
import { getMovieReview } from "../api/main";

export const useGetComments = () => {
  const queryKey = ["comments"];

  const queryFn = async () => {
    try {
      const response = await getMovieReview();
      if (!response || response.error) {
        throw new Error(response?.message || "Failed to fetch comments");
      }
      return response;
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
