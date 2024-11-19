import { useQuery } from "@tanstack/react-query";
import { getMoviesUserbase } from "../api/main";

export const useGetUserMovies = (token) => {
  const queryKey = ["userMovies", token];

  const queryFn = async () => {
    if (token) {
      const response = await getMoviesUserbase();
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
