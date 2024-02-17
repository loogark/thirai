import { Flex, Input, Spinner } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "react-router-dom";
import { CastCard } from "../components/CastCard";
import { MovieCard } from "../components/MovieCard";
import { useGetSearch } from "../hooks/api/useGetSearch";

export const Search = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams();
  const searchQuery = currentQueryParameters.get("query") ?? "";

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetSearch();

  const onChange: (event: ChangeEvent<HTMLInputElement>) => void = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    if (value) newQueryParameters.set("query", value);

    setSearchParams(newQueryParameters);
  };

  const getMediaType = (data: Record<string, any>) => {
    const { media_type } = data;
    switch (media_type) {
      case "tv":
        return <MovieCard isShow key={data.id} data={data} />;
      case "person":
        return <CastCard key={data.id} data={data} />;
      default:
        return <MovieCard key={data.id} data={data} />;
        break;
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      w='100%'
      h='100%'
      gap={8}
      mt='120px'
    >
      <Input
        value={searchQuery}
        onChange={onChange}
        color='white'
        w='70vw'
        variant='filled'
        placeholder='Search for movies, shows, and people'
        bgColor='gray.800'
        _hover={{ bgColor: "gray.700" }}
      />
      {isLoading ? (
        <Spinner size='xl' color='#525CEB' />
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Spinner my='24px' color='#525CEB' size='xl' />}
        >
          <Flex
            direction='row'
            justify='center'
            align='center'
            wrap='wrap'
            gap='24px'
          >
            {data?.pages.map((res) => {
              return res.results.map((res: any) => <> {getMediaType(res)}</>);
            })}
          </Flex>
        </InfiniteScroll>
      )}
    </Flex>
  );
};
