import {
  Flex,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import { Hero } from "../components/Hero";
import { MovieCard } from "../components/MovieCard";
import { useGetPopularMovies } from "../hooks/api/useGetPopularMovies";
import { useGetTopRatedMovies } from "../hooks/api/useGetTopRatedMovies";
import { useGetTrending } from "../hooks/api/useGetTrending";
import { useGetUpcomingMovies } from "../hooks/api/useGetUpcomingMovies";

const LocalTabList = [
  {
    id: "popular",
    name: "Popular",
  },
  {
    id: "top-rated",
    name: "Top-Rated",
  },
  {
    id: "upcoming",
    name: "Upcoming",
  },
];

export const Movies = () => {
  const { data, isLoading } = useGetTrending("movie");
  const {
    data: popularMovies,
    fetchNextPage: nextPopularMovies,
    hasNextPage: hasMorePopular,
  } = useGetPopularMovies();

  const { data: topRated, fetchNextPage, hasNextPage } = useGetTopRatedMovies();
  const {
    data: upcoming,
    fetchNextPage: nextUpcomingPage,
    hasNextPage: hasUpcomingNext,
  } = useGetUpcomingMovies();

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

      <Tabs variant='soft-rounded' isLazy>
        <TabList>
          <Flex
            w='100%'
            p='24px'
            direction='row'
            justifyContent='space-between'
            align='center'
          >
            <Heading lineHeight='tall' size='xs' color='white'>
              Movies
            </Heading>
            <Flex direction='row' justify='center' align='center' gap='4px'>
              {LocalTabList.map((tab) => (
                <Tab
                  _selected={{ color: "white", bg: "#525CEB" }}
                  key={tab.name}
                >
                  {tab.name}
                </Tab>
              ))}
            </Flex>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InfiniteScroll
              pageStart={1}
              loadMore={() => nextPopularMovies()}
              hasMore={hasMorePopular}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {popularMovies?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard key={movie.id} data={movie} />
                  ));
                })}
              </Flex>
            </InfiniteScroll>
          </TabPanel>
          <TabPanel>
            <InfiniteScroll
              pageStart={1}
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {topRated?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard key={movie.id} data={movie} />
                  ));
                })}
              </Flex>
            </InfiniteScroll>
          </TabPanel>
          <TabPanel>
            <InfiniteScroll
              pageStart={1}
              loadMore={() => nextUpcomingPage()}
              hasMore={hasUpcomingNext}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {upcoming?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard key={movie.id} data={movie} />
                  ));
                })}
              </Flex>
            </InfiniteScroll>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
