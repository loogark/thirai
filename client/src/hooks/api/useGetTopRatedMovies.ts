import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetTopRatedMovies = () => {
  const query = useInfiniteQuery(
    ["top-rated-movies"],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/movie/toprated/${pageParam}`);
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
