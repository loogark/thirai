import { Box, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthModal } from "../context/AuthModalProvider";
import { useUser } from "../context/UserProvider";
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
  const { getUser } = useUser();
  const user = getUser();
  const { setAuthModalOpen } = useAuthModal();

  const collectItem = useMemo(
    () =>
      collectionData?.collection?.find((item: any) => {
        return item?.mediaId === data?.id || data?.mediaId;
      }),
    [collectionData?.collection, data?.id, isLoading, data?.mediaId]
  );

  const handleLike = () => {
    if (user) {
      if (collectItem !== undefined) {
        removeFromCollection.mutate({ id: data?._id ?? collectItem?._id });
      } else {
        addToCollection.mutate({
          mediaId: data?.id,
          media_type: data?.media_type ?? "person",
          original_title:
            data?.original_title ?? data?.original_name ?? data?.name,
          poster_path: data?.media_type ? data?.poster_path : undefined,
          profile_path: !data?.media_type ? data?.profile_path : undefined,
          vote_average: data?.vote_average,
          vote_count: data?.vote_count,
        });
      }
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <Box
      cursor='pointer'
      mr='8px'
      w='fit-content'
      h='fit-content'
      as={motion.div}
      whileTap={{ scale: 0.8 }}
      onClick={handleLike}
    >
      {isLoading ||
      addToCollection.isLoading ||
      removeFromCollection.isLoading ? (
        <Spinner size='xs' color='#525CEB' />
      ) : collectItem !== undefined && user ? (
        <FaHeart color='#525CEB' />
      ) : (
        <FaRegHeart color='white' />
      )}
    </Box>
  );
};
