import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetSeries = (id: string) => {
  const query = useQuery(["show", id], async () => {
    const response = await API.get(`api/details/show/${id}`);
    return response.data;
  });

  return query;
};
