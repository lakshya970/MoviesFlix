import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Nowplay from "./pages/Nowplay";
import Populer from "./pages/Populer";
import Toprated from "./pages/Toprated";
import Upcoming from "./pages/Upcoming";
import Trending from "./pages/Trending";
import Search from "./pages/Search";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />

        <Route path="/movie/nowplay" element={<Nowplay />} />
        <Route path="/movie/popular" element={<Populer />} />
        <Route path="/movie/top_rated" element={<Toprated />} />
        <Route path="/movie/upcoming" element={<Upcoming />} />
        <Route path="/movie/trending" element={<Trending />} />
      </Route>
    </Routes>
  );
};

export default App;
