import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/UserProvider";
import { API, queryClient } from "../../utils/query";

export const useRemoveFromCollection = () => {
  const { getUser } = useUser();
  const user = getUser();

  const mutation = useMutation<any, undefined, { id: string }>(
    async ({ id }) => {
      const response = await API.delete(`/user/collection/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["collections"]);
      },
    }
  );
  return mutation;
};
