import { Flex, Icon } from "@chakra-ui/react";
import { MutableRefObject, forwardRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

interface Props {
  data: Record<string, any>[];
}

export type Ref = React.RefObject<HTMLDivElement | null>;

export const ScrollHandlers = forwardRef<Ref, Props>(({ data }, ref) => {
  const [showScrollLeft, showScrollRight] = useHorizontalScroll(
    ref as MutableRefObject<HTMLInputElement | null>,
    data
  );

  const scrollHorizontally = (scrollOffset: number) => {
    if (!(ref as MutableRefObject<HTMLInputElement | null>)?.current) return;

    (ref as MutableRefObject<HTMLInputElement | null>)!.current!.scrollLeft +=
      scrollOffset;
  };

  return (
    <>
      {showScrollRight && (
        <Flex
          position='absolute'
          height={{ base: "25px", md: "50px" }}
          width={{ base: "25px", md: "50px" }}
          borderRadius='full'
          top={"45%"}
          right={"12px"}
          background='rgba(0, 0, 0, .5)'
          justify='center'
          align='center'
          zIndex={1}
          cursor='pointer'
          onClick={() => scrollHorizontally(150)}
        >
          <Icon
            as={IoIosArrowForward}
            color='white'
            boxSize={{ base: 4, lg: 8 }}
          />
        </Flex>
      )}
      {showScrollLeft && (
        <Flex
          position='absolute'
          height={{ base: "25px", md: "50px" }}
          width={{ base: "25px", md: "50px" }}
          borderRadius='full'
          top={"45%"}
          left={"12px"}
          background='rgba(0, 0, 0, .5)'
          justify='center'
          align='center'
          zIndex={1}
          cursor='pointer'
          onClick={() => scrollHorizontally(-150)}
        >
          <Icon
            as={IoIosArrowBack}
            color='white'
            boxSize={{ base: 4, lg: 8 }}
          />
        </Flex>
      )}
    </>
  );
});
