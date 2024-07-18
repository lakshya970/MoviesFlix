import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";

const Nowplay = () => {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&page=${page}`
    );

    setMovie(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  if (!movie) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="px-3">
        <Heading title={"Now Play"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movie.map((value) => (
            <div key={value.id} className="my-2 mx-2">
              <Link to={`/movie/details/${value.id}`}>
                <Card
                  poster={value.poster_path}
                  rating={value.vote_average}
                  title={value.title || value.name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between md:justify-center p-5 md:gap-96 mt-4">
        <button
          defaultValue={0}
          className="px-4 py-2 text-red-600 rounded-md border border-red-600 capitalize tracking-wider text-sm md:text-[15px] hover:scale-105 transition-all duration-150 ease-out"
          onClick={() =>
            setPage(page - 1, window.scrollTo({ top: 0, behavior: "smooth" }))
          }
        >
          &larr; previous page
        </button>
        <button
          className="px-4 py-2 text-red-600 rounded-md border border-red-600 capitalize tracking-wider text-sm md:text-[15px] hover:scale-105 transition-all duration-150 ease-out"
          onClick={() =>
            setPage(page + 1, window.scrollTo({ top: 0, behavior: "smooth" }))
          }
        >
          next page &rarr;
        </button>
      </div>
    </div>
  );
};

export default Nowplay;
