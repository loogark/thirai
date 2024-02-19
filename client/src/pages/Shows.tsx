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
import { useGetOnAirSeries } from "../hooks/api/useGetOnAirSeries";
import { useGetPopularSeries } from "../hooks/api/useGetPopularSeries";
import { useGetTopRatedSeries } from "../hooks/api/useGetTopRatedSeries";
import { useGetTrending } from "../hooks/api/useGetTrending";

const LocalTabList = [
  {
    id: "popular",
    name: "Popular",
  },
  {
    id: "on-air",
    name: "On-Air",
  },
  {
    id: "top-rated",
    name: "Top-Rated",
  },
];

export const Shows = () => {
  const { data, isLoading } = useGetTrending("tv");
  const {
    data: onAirSeries,
    fetchNextPage: nextOnAirSeries,
    hasNextPage: hasMoreOnAir,
  } = useGetOnAirSeries();
  const {
    data: popularSeries,
    fetchNextPage: nextPopularSeries,
    hasNextPage: hasMorePopularSeries,
  } = useGetPopularSeries();
  const {
    data: topRatedSeries,
    fetchNextPage: nextTopRatedSeries,
    hasNextPage: hasMoreTopRatedSeries,
  } = useGetTopRatedSeries();

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

      <Tabs variant='soft-rounded' isLazy w={"100%"}>
        <TabList>
          <Flex
            w='100%'
            p='24px'
            direction='row'
            justifyContent='space-between'
            align='center'
            wrap='wrap'
            gap={4}
          >
            <Heading lineHeight='tall' size='xs' color='white'>
              Tv Shows
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
              loadMore={() => nextPopularSeries()}
              hasMore={hasMorePopularSeries}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {popularSeries?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard isShow key={movie.id} data={movie} />
                  ));
                })}
              </Flex>
            </InfiniteScroll>
          </TabPanel>
          <TabPanel>
            <InfiniteScroll
              pageStart={1}
              loadMore={() => nextOnAirSeries()}
              hasMore={hasMoreOnAir}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {onAirSeries?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard isShow key={movie.id} data={movie} />
                  ));
                })}
              </Flex>
            </InfiniteScroll>
          </TabPanel>
          <TabPanel>
            <InfiniteScroll
              pageStart={1}
              loadMore={() => nextTopRatedSeries()}
              hasMore={hasMoreTopRatedSeries}
              loader={<Spinner my='24px' color='#525CEB' size='xl' />}
            >
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {topRatedSeries?.pages.map((res) => {
                  return res.results.map((movie: any) => (
                    <MovieCard isShow key={movie.id} data={movie} />
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
