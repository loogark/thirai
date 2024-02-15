import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { useIsHovered } from "../hooks/useIsHovered";
import { Rating } from "./Rating";

interface Props {
  data: Record<string, any>;
}

export const MovieCard = ({ data }: Props) => {
  const [parentRef, setParentRef] = useState<HTMLDivElement | null>(null);
  const isHovered = useIsHovered([parentRef]).some(Boolean);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <Flex
      layout
      as={motion.div}
      variants={item}
      ref={setParentRef}
      gap={2}
      w='250px'
      h='100%'
      direction='column'
      bg='rgb(19, 19, 19)'
    >
      <AspectRatio
        position='relative'
        w='250px'
        cursor='pointer'
        h='fit-content'
        maxW='400px'
        ratio={0.67 / 1}
        as={ReactRouterLink}
        to={`/movie/${data?.id}`}
      >
        <>
          <Image
            width='100%'
            loading='lazy'
            fallbackSrc='https://mymovies-client.onrender.com/static/media/EmptyCard.82427e86b72979c60e4e5bce792b9c52.svg'
            h='100%'
            objectFit='contain'
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${data?.poster_path}`}
          />
          {isHovered && (
            <Box
              width='100%'
              height='100%'
              top={0}
              left={0}
              position='absolute'
              bgImage='linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
            >
              <Box
                position='absolute'
                left='50%'
                top='50%'
                transform='translate(-50%, -50%)'
              >
                <Rating
                  size='90px'
                  value={Math.round(data?.vote_average * 10) / 10}
                />
                <Text color='white'>{`(${data?.vote_count})`}</Text>
              </Box>
            </Box>
          )}
        </>
      </AspectRatio>
      <Flex direction='row' w='100%' justify='space-between' align='center'>
        <Text
          textAlign='start'
          noOfLines={1}
          color='white'
          fontSize='sm'
          fontWeight='bold'
          m='2'
        >
          {" "}
          {data?.original_title ?? data?.original_name}
        </Text>
        <Box cursor='pointer' mr='4px' w='fit-content' h='fit-content'>
          <FaRegHeart color='white' />
        </Box>
      </Flex>
    </Flex>
  );
};