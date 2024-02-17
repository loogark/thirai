import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CastRow } from "../components/CastRow";
import { Hero } from "../components/Hero";
import { MovieCard } from "../components/MovieCard";
import { PosterRow } from "../components/PosterRow";
import { useGetSeries } from "../hooks/api/useGetSeries";

export const Show = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSeries(id!);
  const [tabIndex, setTabIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const noSimilarShows = data?.similar?.results.length === 0;
  console.log(data);

  useEffect(() => {
    return () => {
      setTabIndex(0);
    };
  }, [id]);

  const container = {
    hidden: { opacity: isInView ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Flex
      direction='column'
      align='flex-start'
      justify='flex-start'
      w='100%'
      h='100%'
      gap={8}
    >
      <Hero data={data} loading={isLoading} status={data?.status} />
      <Tabs
        w='100%'
        variant='soft-rounded'
        isLazy
        index={tabIndex}
        onChange={(i) => setTabIndex(i)}
      >
        <TabList>
          <Flex
            w='100%'
            p='24px'
            direction='row'
            justifyContent='space-between'
            align='center'
          >
            <Heading lineHeight='tall' size='xs' color='white'>
              Show Details
            </Heading>
            <Flex direction='row' justify='center' align='center' gap='4px'>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>
                Cast & Crew
              </Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Media </Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Reviews</Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>
                Similar Shows
              </Tab>
            </Flex>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex p='24px' direction='column' gap='24px'>
              {data?.credits?.cast && data?.credits?.cast.length && (
                <CastRow
                  title='Cast'
                  data={data?.credits?.cast}
                  loading={isLoading}
                />
              )}
              {data?.credits?.crew && data?.credits?.crew.length && (
                <CastRow
                  title='crew'
                  data={data?.credits?.crew}
                  loading={isLoading}
                  isCrew
                />
              )}
              {!data?.credits?.cast &&
                !data?.credits?.cast.length &&
                !data?.credits?.crew &&
                !data?.credits?.crew.length && (
                  <Box width='100%'>
                    <Heading color='white' mx='auto' size='md' as={"h5"}>
                      Sorry, No casts and crew found
                    </Heading>
                  </Box>
                )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction='column' gap='8px' p='24px'>
              {data?.images?.posters && data?.images?.posters.length && (
                <PosterRow data={data?.images?.posters} loading={isLoading} />
              )}
              {data?.images?.backdrops && data?.images?.backdrops.length && (
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
                    justify='flex-start'
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
                          maxW='400px'
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
              {(!data?.images?.posters || !data?.images?.posters.length) &&
                (!data?.images?.backdrops ||
                  !data?.images?.backdrops.length) && (
                  <Box width='100%'>
                    <Heading my='16px' color='gray.500' size='sm'>
                      Sorry, No media found
                    </Heading>
                  </Box>
                )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction='column' gap='8px'>
              <Heading lineHeight='tall' size='xs' color='white'>
                {" "}
                Backdrops
              </Heading>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              direction='row'
              justify='center'
              align='center'
              wrap='wrap'
              gap='24px'
              ref={ref}
              as={motion.div}
              variants={container}
              initial={isInView ? "show" : "hidden"}
              whileInView='show'
              viewport={{ once: true }}
            >
              {!noSimilarShows ? (
                data?.similar?.results.map((res: any) => {
                  return <MovieCard isShow key={res.id} data={res} />;
                })
              ) : (
                <Heading my='16px' color='gray.500' size='sm'>
                  Sorry, no similar shows found
                </Heading>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
