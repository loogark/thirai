import { AspectRatio, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as ReactRouterLink } from "react-router-dom";
import { Like } from "./Like";

interface Props {
  data: Record<string, any>;
}

export const CastCard = ({ data }: Props) => {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <Flex
      layout
      as={motion.div}
      variants={item}
      gap={2}
      w={{ base: "150px", md: "250px" }}
      h='100%'
      direction='column'
      alignSelf='stretch'
      bg='rgb(19, 19, 19)'
    >
      <AspectRatio
        position='relative'
        w={{ base: "150px", md: "250px" }}
        maxW={{ base: "150px", md: "400px" }}
        cursor='pointer'
        h='fit-content'
        ratio={0.67 / 1}
        as={ReactRouterLink}
        to={`/person/${data?.id}`}
      >
        <>
          <Image
            width='100%'
            loading='lazy'
            fallbackSrc='https://mymovies-client.onrender.com/static/media/EmptyCard.82427e86b72979c60e4e5bce792b9c52.svg'
            h='100%'
            objectFit='contain'
            src={
              data?.profile_path
                ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${data?.profile_path}`
                : "https://mymovies-client.onrender.com/static/media/EmptyCard.82427e86b72979c60e4e5bce792b9c52.svg"
            }
          />
        </>
      </AspectRatio>
      <Flex
        h='100%'
        direction='row'
        w='100%'
        justify='space-between'
        align='center'
      >
        <VStack m={2} spacing={0} align='start'>
          <Text
            textAlign='start'
            noOfLines={1}
            color='white'
            fontSize='sm'
            fontWeight='bold'
          >
            {" "}
            {data?.name ?? data?.original_name ?? data?.original_title}
          </Text>
        </VStack>
        <Like data={data} />
      </Flex>
    </Flex>
  );
};
