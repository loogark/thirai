import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetTopRatedSeries = () => {
  const query = useInfiniteQuery(
    ["top-rated-series"],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/show/toprated/${pageParam}`);
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
      onSuccess: (data) => {},
    }
  );

  return query;
};
