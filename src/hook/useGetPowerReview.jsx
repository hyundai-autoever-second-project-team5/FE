import { useQuery } from "@tanstack/react-query";
import { getPowerReview } from "../api/main";

export const useGetPowerReviews = () => {
  const queryKey = ["powerReviews"];

  const queryFn = async () => {
    try {
      const response = await getPowerReview();
      if (!response) {
        throw new Error("Failed to fetch power reviews");
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
      console.error("Power Review Query failed:", error.message);
    },
    enabled: true,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};