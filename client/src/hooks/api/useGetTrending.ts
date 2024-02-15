import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetTrending = (type: "movie" | "tv") => {
  const query = useQuery(
    ["trending", type],
    async () => {
      const response = await API.get(`api/trending/${type}`);
      return response.data;
    },
    {
      onSuccess: (data) => {},
    }
  );

  return query;
};
