import { Box, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddToCollection } from "../hooks/api/useAddToCollection";
import { useGetCollection } from "../hooks/api/useGetCollection";
import { useRemoveFromCollection } from "../hooks/api/useRemoveFromCollection";

interface Props {
  data: Record<string, any>;
}

export const Like = ({ data }: Props) => {
  const { data: collectionData, isLoading } = useGetCollection();
  const addToCollection = useAddToCollection();
  const removeFromCollection = useRemoveFromCollection();
  console.log(data, "data");

  const collectItem = useMemo(
    () =>
      collectionData?.collection?.find((item: any) => {
        return item?.mediaId === data?.id || data?.mediaId;
      }),
    [collectionData?.collection, data?.id]
  );

  return (
    <Box
      cursor='pointer'
      mr='8px'
      w='fit-content'
      h='fit-content'
      as={motion.div}
      whileTap={{ scale: 0.8 }}
      onClick={() => {
        collectItem !== undefined
          ? removeFromCollection.mutate({ id: data?._id ?? collectItem?._id })
          : addToCollection.mutate({
              mediaId: data?.id,
              media_type: data?.media_type ?? "person",
              original_title:
                data?.original_title ?? data?.original_name ?? data?.name,
              poster_path: data?.media_type ? data?.poster_path : undefined,
              profile_path: !data?.media_type ? data?.profile_path : undefined,
              vote_average: data?.vote_average,
              vote_count: data?.vote_count,
            });
      }}
    >
      {isLoading ||
      addToCollection.isLoading ||
      removeFromCollection.isLoading ? (
        <Spinner size='xs' color='#525CEB' />
      ) : collectItem !== undefined ? (
        <FaHeart color='#525CEB' />
      ) : (
        <FaRegHeart color='white' />
      )}
    </Box>
  );
};
