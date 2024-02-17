import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { API } from "../../utils/query";

interface CollectionData {
  mediaId: string;
  mediaType: string;
  title: string;
  imagePath: string;
}

export const useAddLike = ({}: CollectionData) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { getUser } = useUser();
  const mutation = useMutation<any, undefined, any>(
    async ({ email, password }) => {
      const response = await API.post("/user/collection", {
        email,
        password,
      });
      return response.data;
    }
  );
};
