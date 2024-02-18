import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

interface Props {}

export const useGetSeriesReviews = (id: string) => {
  const query = useInfiniteQuery(
    ["show-review", id],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/show/${id!}/reviews/${pageParam}`);
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
