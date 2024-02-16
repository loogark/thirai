import {
  AspectRatio,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { LiaImdb } from "react-icons/lia";
import { RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import { useGetPerson } from "../hooks/api/useGetPerson";

export const Person = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPerson(id!);
  console.log(data, isLoading);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const container = {
    hidden: { opacity: isInView ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const removeDuplicateCasts = data?.combined_credits?.cast.filter(
    (value: Record<string, any>, index: number, self: any) =>
      index === self.findIndex((t: Record<string, any>) => t?.id === value?.id)
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Flex
      direction='column'
      align='flex-start'
      justify='flex-start'
      w='100%'
      h='100%'
      gap={8}
      mt='76px'
      px='54px'
      py='36px'
    >
      <Heading color={"white"} as='h1' size='lg'>
        {data?.name}{" "}
      </Heading>
      <Flex dir='row' justify='start' align='start' gap='12px' width='100%'>
        <AspectRatio flexShrink={0} ratio={0.67 / 1} w='300px' h='fit-content'>
          <Image
            src={
              data?.profile_path
                ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${data?.profile_path}`
                : "https://mymovies-client.onrender.com/static/media/EmptyCard.82427e86b72979c60e4e5bce792b9c52.svg"
            }
          />
        </AspectRatio>
        <VStack justify='start' align='start' spacing={0}>
          {data?.biography && (
            <Text textAlign='start' color='white'>
              {data?.biography}
            </Text>
          )}
          <HStack gap={4} mt='12px' align='center' justify='center'>
            {data?.imdb_id && (
              <Link
                href={`https://www.imdb.com/name/${data?.imdb_id}`}
                isExternal
              >
                <LiaImdb size='36px' color='white' />{" "}
              </Link>
            )}
            {data?.external_ids?.instagram_id && (
              <Link
                href={`https://www.instagram.com/${data?.external_ids?.instagram_id}`}
                isExternal
              >
                <RiInstagramFill size='28px' color='white' />
              </Link>
            )}
            {data?.external_ids?.facebook_id && (
              <Link
                href={`https://www.facebook.com/${data?.external_ids?.facebook_id}`}
                isExternal
              >
                <RiFacebookFill size='28px' color='white' />
              </Link>
            )}
          </HStack>
        </VStack>
      </Flex>
      <Tabs w='100%' variant='soft-rounded' isLazy>
        <TabList>
          <Flex
            w='100%'
            p='24px'
            direction='row'
            justifyContent='space-between'
            align='center'
          >
            <Heading lineHeight='tall' size='xs' color='white'>
              Details
            </Heading>
            <Flex direction='row' justify='center' align='center' gap='4px'>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Cast </Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Crew</Tab>
              <Tab _selected={{ color: "white", bg: "#525CEB" }}>Photos</Tab>
            </Flex>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              my='24px'
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
              gap='8px'
            >
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
                {removeDuplicateCasts?.map((res: any) => {
                  return (
                    <MovieCard
                      isShow={res?.media_type === "tv"}
                      key={res?.name}
                      data={res}
                    />
                  );
                })}
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
                {console.log(
                  data?.combined_credits?.cast.filter(
                    (value: Record<string, any>, index: number, self: any) =>
                      index ===
                      self.findIndex(
                        (t: Record<string, any>) => t?.id === value?.id
                      )
                  ),
                  "filetered"
                )}
                {removeDuplicateCasts?.map((res: any) => {
                  return (
                    <MovieCard
                      isShow={data?.media_type === "show"}
                      key={res.id}
                      data={res}
                    />
                  );
                })}
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
