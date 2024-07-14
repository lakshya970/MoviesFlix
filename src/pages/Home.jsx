import React from "react";
import HomeSlider from "../components/HomeSlider";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <HomeSlider type={"movie"} />
      <Slider type={"movie"} title={"popular movies"} category={"popular"} />
      <Slider
        type={"movie"}
        title={"top rated movies"}
        category={"top_rated"}
      />
      <Slider
        type={"movie"}
        title={"now playing movies"}
        category={"now_playing"}
      />
      <Slider type={"movie"} title={"upcoming movies"} category={"upcoming"} />
    </div>
  );
};

export default Home;
