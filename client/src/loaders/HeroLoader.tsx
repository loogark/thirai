import { Box, Spinner } from "@chakra-ui/react";

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
        left='50%'
        top='50%'
        transform='translate(-50%, -50%)'
        zIndex={1}
        position='absolute'
        w='100%'
        h='fit-content'
      >
        <Spinner size='xl' color='#525CEB' />
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
