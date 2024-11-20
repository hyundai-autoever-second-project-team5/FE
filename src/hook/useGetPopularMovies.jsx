import { useQuery } from "@tanstack/react-query";
import { getMoviePopular } from "../api/main";

export const useGetPopularMovies = () => {
  const queryKey = ["popularMovies"];

  const queryFn = async () => {
    const response = await getMoviePopular();
    return response;
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
