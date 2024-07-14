import React from "react";
import MovieGrid from "../components/MovieGrid";

const Movie = () => {
  return (
    <div>
      <MovieGrid type="movie" category={"populer"} />
    </div>
  );
};

export default Movie;
