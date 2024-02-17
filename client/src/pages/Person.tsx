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
import { useEffect } from "react";
import { LiaImdb } from "react-icons/lia";
import { RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import { useGetPerson } from "../hooks/api/useGetPerson";

export const Person = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPerson(id!);

  const removeDuplicateCasts = data?.combined_credits?.cast.filter(
    (value: Record<string, any>, index: number, self: any) =>
      index === self.findIndex((t: Record<string, any>) => t?.id === value?.id)
  );
  const removeDuplicateCrew = data?.combined_credits?.crew.filter(
    (value: Record<string, any>, index: number, self: any) =>
      index === self.findIndex((t: Record<string, any>) => t?.id === value?.id)
  );

  const hasNoImages = data?.images?.profiles?.length === 0;

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
              direction='row'
              justify={"center"}
              align='center'
              wrap='wrap'
              gap='24px'
            >
              {removeDuplicateCasts?.length ? (
                removeDuplicateCasts?.map((res: any) => {
                  return (
                    <MovieCard
                      isShow={res?.media_type === "tv"}
                      key={res?.name}
                      data={res}
                    />
                  );
                })
              ) : (
                <Heading my='16px' color='gray.500' size='sm'>
                  Sorry, no acting roles found
                </Heading>
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              direction='row'
              justify={"center"}
              align='center'
              wrap='wrap'
              gap='24px'
            >
              {removeDuplicateCrew?.length ? (
                removeDuplicateCrew?.map((res: any) => {
                  return (
                    <MovieCard
                      isShow={res?.media_type === "tv"}
                      key={res?.id}
                      data={res}
                      department={res?.department}
                    />
                  );
                })
              ) : (
                <Heading my='16px' color='gray.500' size='sm'>
                  Sorry, no crew roles found
                </Heading>
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              direction='row'
              justify='center'
              align='center'
              wrap='wrap'
              gap={4}
            >
              {!hasNoImages ? (
                data?.images?.profiles?.map((image: any) => (
                  <Flex
                    w='fit-content'
                    h='100%'
                    bg='rgb(19, 19, 19)'
                    key={image.file_path}
                  >
                    <AspectRatio
                      position='relative'
                      w={image?.width}
                      cursor='pointer'
                      h='fit-content'
                      maxW='400px'
                      ratio={image?.aspect_ratio}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt={image.file_path}
                        w='100%'
                        h='100%'
                        objectFit='cover'
                      />
                    </AspectRatio>
                  </Flex>
                ))
              ) : (
                <Heading my='16px' color='gray.500' size='sm'>
                  Sorry, no Photos found
                </Heading>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
