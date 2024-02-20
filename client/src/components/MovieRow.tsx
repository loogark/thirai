import { Box, Flex, Heading, Spinner, Tag } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { motion, useInView } from "framer-motion";
import { RefObject, useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { ScrollHandlers } from "./ScrollHandlers";

interface Props {
  data: Record<string, any>;
  loading: boolean;
  title: string;
  path: string;
  isShow?: boolean;
}

export const MovieRow = ({ data, title, path, isShow, loading }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const container = {
    hidden: { opacity: isInView ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  if (loading) {
    return (
      <Flex py='52px' w='100%' h='100%' justify='center' align='center'>
        <Spinner size='xl' color='#535bf2' />
      </Flex>
    );
  }

  return (
    <Flex
      gap={4}
      direction='column'
      justify='flex-start'
      align='flex-start'
      w='100%'
      h='fit-content'
    >
      <Flex
        w={"100%"}
        direction='row'
        gap={2}
        justify='start'
        wrap='wrap'
        align='center'
      >
        <Heading lineHeight='tall' size='xs' color='white'>
          {title}
        </Heading>
        <Tag
          as={ReactRouterLink}
          to={path}
          variant='solid'
          colorScheme='blue'
          _hover={{ color: "white", bgColor: "blue.700" }}
        >
          Explore All
        </Tag>
      </Flex>
      <Box w='100%' h='100%' position='relative' boxSizing='border-box'>
        <Flex
          ref={ref}
          as={motion.div}
          variants={container}
          initial={isInView ? "show" : "hidden"}
          whileInView='show'
          viewport={{ once: true }}
          direction='row'
          gap={2}
          w='100%'
          h='fit-content'
          overflowX='scroll'
          css={css`
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {data?.results?.map((movie: any) => (
            <MovieCard key={data.id} data={movie} isShow={isShow} />
          ))}
          <ScrollHandlers ref={ref as RefObject<typeof ref>} />
        </Flex>
      </Box>
    </Flex>
  );
};
