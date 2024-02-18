import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetPopularMovies = () => {
  const query = useInfiniteQuery(
    ["popular-movies"],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/movie/popular/${pageParam}`);
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
