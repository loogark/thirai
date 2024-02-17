import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { UserImage } from "../components/UserImage";
import { useUser } from "../context/UserProvider";
import { useGetCollection } from "../hooks/api/useGetCollection";

export const Account = () => {
  const { data } = useGetCollection();
  const { getUser } = useUser();
  const user = getUser();
  console.log(user);

  return (
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
            <Heading textAlign='start' as='h1' size='xl' color='white'>
              {user?.firstName}{" "}
            </Heading>
          </HStack>

          <Text textAlign='start' noOfLines={3} fontSize='xl' color='white'>
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
    </Flex>
  );
};
