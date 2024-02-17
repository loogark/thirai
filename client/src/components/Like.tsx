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

  const collectItem = useMemo(
    () =>
      collectionData?.collection?.find((item: any) => {
        return item?.mediaId === data?.id;
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
          ? removeFromCollection.mutate({ id: collectItem?._id })
          : addToCollection.mutate({
              mediaId: data?.id,
              mediaType: data?.media_type ?? "person",
              title: data?.original_title ?? data?.original_name ?? data?.name,
              imagePath: data?.poster_path ?? data?.profile_path ?? null,
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
