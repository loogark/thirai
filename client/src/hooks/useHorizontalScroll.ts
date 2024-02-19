import React, { useEffect, useState } from "react";

export const useHorizontalScroll = (
  ref: React.RefObject<HTMLElement>,
  content: Array<Record<string, any>>
) => {
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = ref!.current;
      if (scrollContainer) {
        const scrollX = scrollContainer.scrollLeft;
        const scrollThreshold = 200; // Adjust this value based on when you want to show the buttons

        setShowScrollLeft(scrollX > scrollThreshold);
        setShowScrollRight(
          scrollX <
            scrollContainer.scrollWidth -
              scrollContainer.clientWidth -
              scrollThreshold
        );
      }
    };

    const scrollContainer = ref!.current;
    if (scrollContainer) {
      // Add event listener for scroll
      scrollContainer.addEventListener("scroll", handleScroll);

      // Clean up the event listener on component unmount
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref]);

  return [showScrollLeft, showScrollRight];
};
