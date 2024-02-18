import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

interface Props {}

export const useGetMovieReviews = (id?: string) => {
  const query = useInfiniteQuery(
    ["movie-review", id],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/movie/${id!}/reviews/${pageParam}`);
      return { ...response.data, nextCursor: pageParam + 1 };
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
