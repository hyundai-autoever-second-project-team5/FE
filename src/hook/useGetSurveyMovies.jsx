import { useQuery } from "@tanstack/react-query";
import { getMovieSurvey } from "../api/main";

export const useGetSurveyMovies = (token) => {
  const queryKey = ["survey", token];

  const queryFn = async () => {
    if (token) {
      const response = await getMovieSurvey();
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
