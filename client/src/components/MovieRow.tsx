import { Flex, Heading, Tag } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MovieCard } from "./MovieCard";

interface Props {
  data: Record<string, any>;
  loading: boolean;
  title: string;
  path: string;
  isShow?: boolean;
}

export const MovieRow = ({ data, loading, title, path, isShow }: Props) => {
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

  return (
    <Flex
      gap={4}
      direction='column'
      justify='flex-start'
      align='flex-start'
      w='100%'
      h='fit-content'
    >
      <Flex direction='row' gap={2} justify='center' align='center'>
        <Heading lineHeight='tall' size='xs' color='white'>
          {title}
        </Heading>
        <Tag as={ReactRouterLink} to={path} variant='solid' colorScheme='blue'>
          Explore All
        </Tag>
      </Flex>
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
      >
        {data?.results?.map((movie: any) => (
          <MovieCard key={data.id} data={movie} isShow={isShow} />
        ))}
      </Flex>
    </Flex>
  );
};
