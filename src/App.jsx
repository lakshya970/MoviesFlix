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
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
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
