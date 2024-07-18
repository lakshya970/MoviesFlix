import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Loading from "../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { TiStarFullOutline } from "react-icons/ti";
const imgSM = "https://image.tmdb.org/t/p/w500";

const Search = () => {
  const { query } = useParams();

  const fetchMovie = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&page=${pageParam}&query=${query}`
    );
    return response.data;
  };

  const { data, isLoading, refetch, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["search", query], fetchMovie, {
      getNextPageParam: (lastpage, page) => {
        return lastpage.total_pages != page.length && lastpage.total_pages != 0
          ? page.length + 1
          : undefined;
      },
    });
  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  if (isError) {
    <div className=" min-h-screen flex justify-center items-center text-lg font-semibold capitalize w-full">
      sorry, something went worng : (
    </div>;
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-3 space-y-2 mt-3">
          <div className="text-white">
            <span className=" capitalize">search results of :</span>
            <span className="text-red-600"> {query}</span>
          </div>
          <div className="text-white">
            <span className="text-red-600">{data.pages[0].total_results} </span>
            results founded
          </div>
          <div>
            <InfiniteScroll
              dataLength={data.pageParams.length * 20}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Loading />}
              endMessage={
                <div className="text-center capitalize">
                  no more items to show.
                </div>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
                {data.pages.map((page) =>
                  page.results.map((value) => (
                    <Link
                      to={`/movie/details/${value.id}`}
                      key={value.id}
                      className="p-2"
                    >
                      <Card
                        poster={value.poster_path}
                        rating={value.vote_average}
                        title={value.title || value.name}
                      />
                    </Link>
                  ))
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
