import axios from "axios";
import { useEffect, useState } from "react";

const getMovies = () => {
  let movies = JSON.parse(localStorage.getItem("movies"));
  if (!movies) {
    return null;
  } else {
    return movies;
  }
};

const getMovieList = () => {
  let movieList = JSON.parse(localStorage.getItem("movieList"));
  if (!movieList) {
    return [];
  } else {
    return movieList;
  }
};

const useFetch = (url, page) => {
  const [movies, setMovies] = useState(getMovies());
  const [movieList, setMovieList] = useState(getMovieList());

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setMovies(response.data);
      setMovieList([...movieList, ...response.data.results]);
      localStorage.setItem("movies", JSON.stringify(response.data));
      localStorage.setItem("movieList", JSON.stringify(movieList));
      console.log(response.data);
    };

    fetchData();
  }, [page]);

  return [movies, movieList];
};

export default useFetch;
