import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetTrending = (type: "movie" | "tv", sendAll?: boolean) => {
  const query = useQuery(
    ["trending", type, sendAll],
    async () => {
      const response = await API.get(`api/trending/${type}`);
      return sendAll ? response.data : response.data?.results[0];
    },
    {
      onSuccess: (data) => {},
    }
  );

  return query;
};
