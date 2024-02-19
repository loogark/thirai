import { Box, Flex, Heading } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { motion, useInView } from "framer-motion";
import { RefObject, useRef } from "react";
import { CastCard } from "./CastCard";
import { CrewCard } from "./CrewCard";
import { ScrollHandlers } from "./ScrollHandlers";

interface Props {
  data: Record<string, any>;
  loading: boolean;
  isCrew?: boolean;
  title: string;
}

export const CastRow = ({ data, loading, isCrew, title }: Props) => {
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

  if (!data) return null;

  return (
    <Flex
      gap={4}
      direction='column'
      justify='flex-start'
      align='flex-start'
      w='100%'
      h='fit-content'
    >
      <Flex wrap='wrap' direction='row' gap={2} justify='center' align='center'>
        <Heading lineHeight='tall' size='xs' color='white'>
          {title}
        </Heading>
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
          alignItems='stretch'
          justifyContent='stretch'
          css={css`
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {data?.map((movie: any) =>
            isCrew ? (
              <CrewCard key={data?.id} data={movie} />
            ) : (
              <CastCard key={data?.name} data={movie} />
            )
          )}
          <ScrollHandlers
            data={data as Record<string, any>[]}
            ref={ref as RefObject<typeof ref>}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
