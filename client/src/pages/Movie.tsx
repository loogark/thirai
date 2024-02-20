import {
  AspectRatio,
  Flex,
  Heading,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import { CastRow } from "../components/CastRow";
import { Hero } from "../components/Hero";
import { MovieCard } from "../components/MovieCard";
import { PosterRow } from "../components/PosterRow";
import { Review } from "../components/Review";
import { useGetMovie } from "../hooks/api/useGetMovie";
import { useGetMovieReviews } from "../hooks/api/useGetMovieReviews";

export const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie(id!);

  const {
    data: reviewData,
    isLoading: reviewLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMovieReviews(id!);

  return (
    <>
      <Helmet>
        <title>
          {`${data?.original_title ?? data?.original_name ?? "Movie"} - `}{" "}
          Thirai
        </title>
        <meta
          name='description'
          content={`${
            data?.overview ??
            data?.original_title ??
            data?.original_name ??
            "Movie"
          } in thirai`}
        />
      </Helmet>
      <Flex
        direction='column'
        align='flex-start'
        justify='flex-start'
        w='100%'
        h='100%'
        gap={8}
      >
        <Hero data={data} loading={isLoading} />
        <Tabs w='100%' variant='soft-rounded'>
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
                Movie Details
              </Heading>
              <Flex
                direction='row'
                justify='center'
                align='center'
                gap='4px'
                wrap='wrap'
              >
                <Tab _selected={{ color: "white", bg: "#525CEB" }}>
                  Cast & Crew
                </Tab>
                <Tab _selected={{ color: "white", bg: "#525CEB" }}>Media </Tab>
                <Tab _selected={{ color: "white", bg: "#525CEB" }}>Reviews</Tab>
                <Tab _selected={{ color: "white", bg: "#525CEB" }}>
                  Similar Movies
                </Tab>
              </Flex>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex p='24px' direction='column' gap='24px'>
                {data?.casts?.cast?.length && (
                  <CastRow
                    title='Cast'
                    data={data?.casts?.cast}
                    loading={isLoading}
                  />
                )}
                {data?.casts?.crew?.length && (
                  <CastRow
                    title='crew'
                    data={data?.casts?.crew}
                    loading={isLoading}
                    isCrew
                  />
                )}
                {!data?.casts?.cast?.length && !data?.casts?.crew?.length && (
                  <Heading
                    my='16px'
                    color='gray.500'
                    size={{ base: "xs", md: "sm" }}
                  >
                    Sorry, no cast and crew details available
                  </Heading>
                )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex width='100%' direction='column' gap='8px' p='24px'>
                <PosterRow data={data?.images?.posters} loading={isLoading} />
                {data?.images?.backdrops.length && (
                  <Flex
                    my='24px'
                    direction='column'
                    justify='flex-start'
                    alignItems='flex-start'
                    gap='8px'
                  >
                    <Heading lineHeight='tall' size='xs' color='white'>
                      {" "}
                      Backdrops
                    </Heading>
                    <Flex
                      direction='row'
                      justify='center'
                      align='center'
                      wrap='wrap'
                      gap={4}
                    >
                      {data?.images?.backdrops?.map((backdrop: any) => (
                        <Flex
                          w='fit-content'
                          h='100%'
                          bg='rgb(19, 19, 19)'
                          key={backdrop.file_path}
                        >
                          <AspectRatio
                            position='relative'
                            w={backdrop?.width}
                            cursor='pointer'
                            h='fit-content'
                            maxW={{ sm: "90vw", md: "400px" }}
                            ratio={backdrop?.aspect_ratio}
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                              alt={backdrop.file_path}
                              w='100%'
                              h='100%'
                              objectFit='cover'
                            />
                          </AspectRatio>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                )}
                {(!data?.images?.posters || !data?.images?.posters?.length) &&
                  (!data?.images?.backdrops ||
                    !data?.images?.backdrops?.length) && (
                    <Heading color='gray.500' size='sm'>
                      Sorry, no media available
                    </Heading>
                  )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <InfiniteScroll
                loadMore={() => fetchNextPage()}
                hasMore={hasNextPage ?? false}
                loader={<Spinner my='24px' color='#525CEB' size='xl' />}
              >
                <Review data={reviewData} loading={reviewLoading} />
              </InfiniteScroll>
            </TabPanel>

            <TabPanel>
              <Flex
                direction='row'
                justify='center'
                align='center'
                wrap='wrap'
                gap='24px'
              >
                {data?.similar?.results.map((res: any) => {
                  return <MovieCard key={res.id} data={res} />;
                })}
              </Flex>
              {!data?.similar?.results?.length && (
                <Heading my='24px' color='gray.500' size='sm'>
                  Sorry, no similar movies found
                </Heading>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};
