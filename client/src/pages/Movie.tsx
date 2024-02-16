import {
  AspectRatio,
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
import { useGetMovie } from "../hooks/api/useGetMovie";

export const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie(id!);
  const [tabIndex, setTabIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

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
      <Hero data={data} loading={isLoading} />
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
              Movie Details
            </Heading>
            <Flex direction='row' justify='center' align='center' gap='4px'>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>
                Cast & Crew
              </Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Media </Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Reviews</Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Similar</Tab>
            </Flex>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex p='24px' direction='column' gap='24px'>
              <CastRow
                title='Cast'
                data={data?.casts?.cast}
                loading={isLoading}
              />
              <CastRow
                title='crew'
                data={data?.casts?.crew}
                loading={isLoading}
                isCrew
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction='column' gap='8px' p='24px'>
              <PosterRow data={data?.images?.posters} loading={isLoading} />
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
              direction='column'
              align='flex-start'
              justify='flex-start'
              gap='8px'
              p='24px'
            >
              <Heading lineHeight='tall' size='xs' color='white'>
                {" "}
                Similar Movies
              </Heading>
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
                {data?.similar?.results.map((res: any) => {
                  return <MovieCard key={res.id} data={res} />;
                })}
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
