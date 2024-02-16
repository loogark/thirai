import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetPerson = (id: string) => {
  const query = useQuery(
    ["person", id],
    async () => {
      const response = await API.get(`api/person/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {},
    }
  );

  return query;
};
