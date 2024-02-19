import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetOnAirSeries = () => {
  const query = useInfiniteQuery(
    ["on-air-series"],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/show/ontheair/${pageParam}`);
      return {
        ...response.data,
        nextCursor:
          response?.data?.page === response?.data?.total_pages
            ? null
            : response?.data.page + 1,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return query;
};
