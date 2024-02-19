import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/query";

export const useGetMovieNowPlaying = (page: number) => {
  const query = useQuery(["movies-now-playing", page], async () => {
    const response = await API.get(`api/movie/nowplaying/${page}`);
    return response.data;
  });

  return query;
};
