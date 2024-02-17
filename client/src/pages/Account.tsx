import { useGetCollection } from "../hooks/api/useGetCollection";

export const Account = () => {
  const { data } = useGetCollection();
  console.log(data);

  return (
    <div>
      <p>hello</p>
    </div>
  );
};
