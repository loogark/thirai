import { Box, SkeletonText } from "@chakra-ui/react";

export const HeroLoader = () => {
  return (
    <Box position='relative' width='100%' h='90vh'>
      <Box
        width='100%'
        height='100%'
        top={0}
        left={0}
        position='absolute'
        bgImage='linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
      ></Box>
      <Box
        zIndex={1}
        position='absolute'
        bottom={"90px"}
        w='100%'
        h='fit-content'
      >
        <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='3' />
      </Box>
      <Box
        width='100%'
        height='100%'
        bottom={0}
        left={0}
        position='absolute'
        bgImage='linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
      ></Box>
    </Box>
  );
};
