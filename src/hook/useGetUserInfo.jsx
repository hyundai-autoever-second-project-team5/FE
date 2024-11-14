import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/user";

export const useGetUserInfo = (token) => {
  const queryKey = ["userInfo", token];

  const queryFn = async () => {
    if (token) {
      const response = await getUserInfo();
      return response.data;
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
