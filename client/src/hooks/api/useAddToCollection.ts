import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/UserProvider";
import { API, queryClient } from "../../utils/query";

interface CollectionData {
  mediaId: string;
  mediaType: string;
  title: string;
  imagePath: string;
}

export const useAddToCollection = () => {
  const { getUser } = useUser();
  const user = getUser();

  const mutation = useMutation<any, undefined, CollectionData>(
    async (props) => {
      const response = await API.post(
        "/user/collection",
        {
          userId: user?.userId,
          saveType: "like",
          ...props,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["collections"]);
      },
    }
  );
  return mutation;
};
