import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetUpcomingMovies = () => {
  const query = useInfiniteQuery(
    ["upcoming-movies"],
    async ({ pageParam = 1 }) => {
      console.log(pageParam, "pageParam");
      const response = await API.get(`api/movie/upcoming/${pageParam}`);
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
