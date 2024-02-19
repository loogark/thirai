import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserProvider";
import { API } from "../../utils/query";

export const useGetCollection = () => {
  const { getUser } = useUser();
  const user = getUser();

  const query = useQuery(
    ["collections"],
    async () => {
      const response = await API.get("/user/collection", {
        userId: user?.userId,
        headers: { Authorization: `Bearer ${user?.token}` },
      } as Record<string, any>);
      return response.data;
    },

    {
      onSuccess: (data) => {},
      enabled: user !== null && user !== undefined,
    }
  );

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
};
