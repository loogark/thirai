import { Flex, Heading } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CastCard } from "./CastCard";
import { CrewCard } from "./CrewCard";

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
        alignItems='stretch'
        justifyContent='stretch'
      >
        {data?.map((movie: any) =>
          isCrew ? (
            <CrewCard key={data?.id} data={movie} />
          ) : (
            <CastCard key={data?.name} data={movie} />
          )
        )}
      </Flex>
    </Flex>
  );
};
