import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";
import { useGetTrending } from "./useGetTrending";

export const useGetSingleTrendingSeries = () => {
  const { data } = useGetTrending("tv");

  const singleData = data?.results?.filter(
    (single: Record<string, any>) => single.media_type !== "person"
  )[Math.floor(Math.random() * 10)];

  const query = useQuery(["trending_series", singleData?.id], async () => {
    const response = await API.get(`api/tv/${singleData?.id}`);
    return response.data;
  });

  return query;
};
