import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";
import { useGetTrending } from "./useGetTrending";

export const useGetSingleTrending = () => {
  const { data } = useGetTrending("movie");

  const singleData = data?.results?.filter(
    (single: Record<string, any>) => single.media_type !== "person"
  )[Math.floor(Math.random() * 10)];

  const query = useQuery(
    ["trendingMovie", singleData?.id],
    async () => {
      const response = await API.get(`api/trending/movie/${singleData?.id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {},
    }
  );

  return query;
};
