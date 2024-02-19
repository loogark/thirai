import {
  Avatar,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import dayjs from "dayjs";

interface Props {
  data?: InfiniteData<any>;
  loading: boolean;
}

export const Review = ({ data, loading }: Props) => {
  if (data?.pages[0].results.length === 0)
    return (
      <Flex
        direction='column'
        justify='center'
        align='center'
        gap='36px'
        p='24px'
      >
        <Heading my='16px' color='gray.500' size={{ base: "xs", md: "sm" }}>
          Sorry, no reviews yet
        </Heading>
      </Flex>
    );

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      gap='36px'
      p='24px'
    >
      {loading ? (
        <Spinner color='' size='xl' />
      ) : (
        data?.pages.map((res: any) => {
          return res.results.map((review: any) => (
            <VStack justify='start' align='start' w='100%'>
              <HStack w='100%' justify='start' align='center'>
                <Avatar
                  size='sm'
                  name={review?.author}
                  src={`https://image.tmdb.org/t/p/w200/${review?.author_details.avatar_path}
`}
                />
                <VStack align='flex-start' gap={0}>
                  <Text color='white' fontSize='md'>
                    {review?.author}
                  </Text>
                  <Text color='gray.500' fontSize='sm'>
                    {dayjs(review?.created_at).format("DD-MM-YY")}
                  </Text>
                </VStack>
              </HStack>
              <Text
                textAlign='start'
                color='white'
                fontSize='md'
                dangerouslySetInnerHTML={{ __html: review?.content }}
              ></Text>
            </VStack>
          ));
        })
      )}
    </Flex>
  );
};
