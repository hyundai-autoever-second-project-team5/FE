import { useQuery } from "@tanstack/react-query";
import { getMovieLikes } from "../api/main";

export const useGetLikeMovies = (token) => {
  const queryKey = ["likeMovies", token];

  const queryFn = async () => {
    if (token) {
      const response = await getMovieLikes();
      return response;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!token,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
