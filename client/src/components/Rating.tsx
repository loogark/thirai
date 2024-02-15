import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Props {
  value: number;
  size?: string;
}
export const Rating = ({ value, size }: Props) => {
  return (
    <CircularProgress
      size={size ?? "40px"}
      capIsRound
      max={10}
      value={value}
      color='#525CEB'
    >
      <CircularProgressLabel color='white'>{value}</CircularProgressLabel>
    </CircularProgress>
  );
};
