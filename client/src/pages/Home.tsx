import { Box, Flex } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { MovieRow } from "../components/MovieRow";
import { useGetTrending } from "../hooks/api/useGetTrending";

export const Home = () => {
  const { data, isLoading } = useGetTrending("movie");
  const { data: movieData, isLoading: movieLoading } = useGetTrending(
    "movie",
    true
  );
  const { data: tvData, isLoading: tvLoading } = useGetTrending("tv", true);

  return (
    <Flex
      direction='column'
      align='flex-start'
      justify='flex-start'
      w='100%'
      h='100%'
      gap={8}
    >
      <Hero data={data} loading={isLoading} isClickable />
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
          path='/shows'
          data={tvData}
          loading={tvLoading}
          isShow={true}
        />
      </Box>
    </Flex>
  );
};
