import { Box, Flex } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { MovieRow } from "../components/MovieRow";
import { useGetSingleTrending } from "../hooks/api/useGetSingleTrending";
import { useGetTrending } from "../hooks/api/useGetTrending";

export const Home = () => {
  const { data, isLoading } = useGetSingleTrending();
  const { data: movieData, isLoading: movieLoading } = useGetTrending("movie");
  const { data: tvData, isLoading: tvLoading } = useGetTrending("tv");

  return (
    <Flex
      direction='column'
      align='flex-start'
      justify='flex-start'
      w='100%'
      h='100%'
      gap={8}
    >
      <Hero data={data} loading={isLoading} />
      <Box p='24px' as='section' w='100%' h='fit-content'>
        <MovieRow
          title='Trending Movies'
          path='/movies'
          data={movieData}
          loading={movieLoading}
        />
      </Box>
      <Box p='24px' as='section' w='100%' h='fit-content'>
        <MovieRow
          title='Trending Series'
          path='/series'
          data={tvData}
          loading={tvLoading}
        />
      </Box>
    </Flex>
  );
};
