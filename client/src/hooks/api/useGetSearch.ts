import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { API } from "../../utils/query";

export const useGetSearch = () => {
  const [currentQueryParameters] = useSearchParams();
  const searchQuery = currentQueryParameters.get("query") ?? "";

  const query = useInfiniteQuery(
    ["search-results", searchQuery],
    async ({ pageParam = 1 }) => {
      const response = await API.get(`api/search/${searchQuery}/${pageParam}`);
      return {
        ...response.data,
        nextCursor:
          response?.data?.page === response?.data?.total_pages
            ? null
            : response?.data.page + 1,
      };
    },
    {
      enabled: searchQuery !== null && searchQuery !== "",
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
      onSuccess: (data) => {},
    }
  );

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
};
