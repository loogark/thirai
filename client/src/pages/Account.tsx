import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { UserImage } from "../assets/UserImage";
import { CastCard } from "../components/CastCard";
import { MovieCard } from "../components/MovieCard";
import { useUser } from "../context/UserProvider";
import { useGetCollection } from "../hooks/api/useGetCollection";

const LocalTabList = [
  {
    id: "movies",
    name: "Movies",
  },
  {
    id: "tv-shows",
    name: "Tv-shows",
  },
  {
    id: "person",
    name: "Person",
  },
];

export const Account = () => {
  const { data } = useGetCollection();
  const { getUser } = useUser();
  const user = getUser();

  const collectedMovies = data?.collection?.filter((item: any) => {
    return item?.media_type === "movie";
  });
  const collectedShows = data?.collection?.filter((item: any) => {
    return item?.media_type === "tv";
  });
  const collectedPersons = data?.collection?.filter((item: any) => {
    return item?.media_type === "person";
  });

  return (
    <>
      <Helmet>
        <title>{`${user?.firstName ?? "user "} Account in - `} Thirai</title>
        <meta
          name='description'
          content={`${`${user?.firstName ?? "user "} Account`} in thirai`}
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
        <Flex
          justify='center'
          align='start'
          direction='column'
          w='100%'
          h='60vh'
          overflow='hidden'
          position='relative'
        >
          <AspectRatio
            ml='auto'
            mt='100px'
            ratio={16 / 9}
            w='40%'
            overflow='hidden'
          >
            <UserImage />
          </AspectRatio>
          <Box
            width='100%'
            height='100%'
            top={0}
            left={0}
            position='absolute'
            bgImage='linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
          ></Box>
          <Flex
            padding='2.5rem'
            position='absolute'
            bottom='50px'
            w='60%'
            direction='column'
            align='start'
            justifyContent='start'
            h='fit-content'
            zIndex={1}
            gap={2}
          >
            <HStack gap='2' align='center' justify='center'>
              <Heading
                textAlign='start'
                as='h1'
                size={{ base: "sm", md: "lg", lg: "xl" }}
                color='white'
              >
                {user?.firstName}{" "}
              </Heading>
            </HStack>

            <Text
              textAlign='start'
              noOfLines={3}
              fontSize={{ base: "sm", md: "lg", lg: "xl" }}
              color='white'
            >
              Welcome to Thirai !!! Know your movies and tv series.
            </Text>
          </Flex>
          <Box
            width='100%'
            height='100%'
            bottom={0}
            left={0}
            position='absolute'
            bgImage='linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
          ></Box>
        </Flex>
        <Tabs w='100%' variant='soft-rounded' isLazy>
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
              <Flex
                gap='4px'
                wrap='wrap'
                direction='row'
                justify='center'
                align='center'
              >
                {LocalTabList?.map((tab) => (
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
              {collectedMovies?.length ? (
                <Flex
                  direction='row'
                  justify='center'
                  align='center'
                  wrap='wrap'
                  gap='24px'
                >
                  {collectedMovies?.map((movie: any) => (
                    <MovieCard key={movie?.name} data={movie} />
                  ))}
                  ;
                </Flex>
              ) : (
                <Heading
                  my='16px'
                  color='gray.500'
                  size={{ base: "xs", md: "sm" }}
                >
                  No Movies added to the collection
                </Heading>
              )}
            </TabPanel>
            <TabPanel>
              {collectedShows?.length ? (
                <Flex
                  direction='row'
                  justify='center'
                  align='center'
                  wrap='wrap'
                  gap='24px'
                >
                  {collectedShows?.map((movie: any) => (
                    <MovieCard isShow key={movie?.id} data={movie} />
                  ))}
                </Flex>
              ) : (
                <Heading
                  my='16px'
                  color='gray.500'
                  size={{ base: "xs", md: "sm" }}
                >
                  No Tv Shows added to the collection
                </Heading>
              )}
            </TabPanel>
            <TabPanel>
              {collectedPersons?.length ? (
                <Flex
                  direction='row'
                  justify='center'
                  align='center'
                  wrap='wrap'
                  gap='24px'
                >
                  {collectedPersons?.map((movie: any) => (
                    <CastCard key={movie?.name} data={movie} />
                  ))}
                </Flex>
              ) : (
                <Heading
                  my='16px'
                  color='gray.500'
                  size={{ base: "xs", md: "sm" }}
                >
                  {" "}
                  No Persons added to the collection
                </Heading>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};
