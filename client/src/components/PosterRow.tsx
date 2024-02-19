import { AspectRatio, Box, Flex, Heading, Image } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { motion, useInView } from "framer-motion";
import { RefObject, useRef } from "react";
import { ScrollHandlers } from "./ScrollHandlers";

interface Props {
  data: Record<string, any>[];
  loading: boolean;
}

export const PosterRow = ({ data }: Props) => {
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

  if (!data?.length) return null;

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
          Posters
        </Heading>
      </Flex>
      <Box position='relative' w='100%' h='100%' boxSizing='border-box'>
        <Flex
          ref={ref}
          as={motion.div}
          variants={container}
          initial={isInView ? "show" : "hidden"}
          whileInView='show'
          viewport={{ once: true }}
          direction='row'
          gap={4}
          w='100%'
          h='100%'
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
          {data?.map((poster: any) => (
            <Flex w='250px' h='100%' bg='rgb(19, 19, 19)'>
              <AspectRatio
                w='250px'
                cursor='pointer'
                h='fit-content'
                ratio={0.67 / 1}
              >
                <>
                  <Image
                    width='100%'
                    loading='lazy'
                    fallbackSrc='https://mymovies-client.onrender.com/static/media/EmptyCard.82427e86b72979c60e4e5bce792b9c52.svg'
                    h='100%'
                    objectFit='contain'
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${poster?.file_path}`}
                  />
                </>
              </AspectRatio>
            </Flex>
          ))}
        </Flex>
        <ScrollHandlers data={data} ref={ref as RefObject<typeof ref>} />
      </Box>
    </Flex>
  );
};
