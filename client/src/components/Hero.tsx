import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeroLoader } from "../loaders/HeroLoader";
import { Rating } from "./Rating";

interface Props {
  data: Record<string, any>;
  loading: boolean;
  status?: string;
  isClickable?: boolean;
}

export const Hero = ({ data, loading, status, isClickable }: Props) => {
  const navigate = useNavigate();
  const pathType = data?.media_type === "tv" ? "show" : "movie";
  if (loading) return <HeroLoader />;

  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{ y: -900 }}
        animate={{ y: 0 }}
        exit={{ y: -900 }}
        justify='center'
        align='start'
        direction='column'
        w='100%'
        h='90vh'
        overflow='hidden'
        position='relative'
        cursor={isClickable ? "pointer" : "auto"}
        onClick={() => isClickable && navigate(`/${pathType}/${data?.id}`)}
      >
        <AspectRatio ratio={16 / 9} w='100%' overflow='hidden'>
          <Image
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt={`${data?.title || data?.name} backdrop image`}
            w='100%'
            h='100%'
            objectFit='cover'
          ></Image>
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
          <Heading textAlign='start' as='h1' size='xl' color='white'>
            {data?.original_title ?? data?.original_name}
          </Heading>
          <HStack gap='2' mr='4px'>
            {data?.genres?.map((genre: Record<string, any>) => (
              <Tag variant='solid' colorScheme='blue' key={genre.id}>
                {genre.name}
              </Tag>
            ))}
            {status && (
              <Tag colorScheme='red' variant='solid'>{`Status: ${status}`}</Tag>
            )}
          </HStack>
          <Text textAlign='start' noOfLines={3} fontSize='lg' color='white'>
            {data?.overview}{" "}
          </Text>
          <HStack gap='2'>
            <Rating value={Math.round(data?.vote_average * 10) / 10} />
            <Text color='white'>{`(${data?.vote_count})`}</Text>
          </HStack>
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
    </AnimatePresence>
  );
};
