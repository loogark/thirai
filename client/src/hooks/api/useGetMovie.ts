import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetMovie = (id: string) => {
  const query = useQuery(["movie", id], async () => {
    const response = await API.get(`api/details/movie/${id}`);
    return response.data;
  });

  return query;
};
