import { useQuery } from "@tanstack/react-query";
import { getMovieLatest } from "../api/main";

export const useGetLatestMovies = () => {
  const queryKey = ["latestMovies"];

  const queryFn = async () => {
    const response = await getMovieLatest();
    return response;
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
