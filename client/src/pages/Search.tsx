import { Flex, Heading, Input, Spinner } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "react-router-dom";
import { SearchAssets } from "../assets/SearchAssets";
import { CastCard } from "../components/CastCard";
import { MovieCard } from "../components/MovieCard";
import { useDebounce } from "../hooks/api/useDebounce";
import { useGetSearch } from "../hooks/api/useGetSearch";

export const Search = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams();
  const searchQuery = currentQueryParameters.get("query") ?? "";

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetSearch();

  const [value, setValue] = useState<string>(searchQuery ?? "");
  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value !== "") newQueryParameters.set("query", value);

    setSearchParams(newQueryParameters);
  }, [debouncedValue]);

  const getMediaType = (data: Record<string, any>) => {
    const { media_type } = data;
    switch (media_type) {
      case "tv":
        return <MovieCard isShow key={data.id} data={data} />;
      case "person":
        return <CastCard key={data.id} data={data} />;
      default:
        return <MovieCard key={data.id} data={data} />;
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
        value={value}
        onChange={handleChange}
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
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage ?? false}
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
      {data?.pages[0].results.length === 0 && (
        <Heading my='16px' color='gray.500' size='sm'>
          No results found
        </Heading>
      )}
      {!isLoading && !searchQuery && (
        <Flex maxW='380px' h='300px' justify='start' align='center'>
          <SearchAssets />{" "}
        </Flex>
      )}
    </Flex>
  );
};
