import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import Card from "./Card";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperConfing } from "../config/SwiperConfing";

const Slider = ({ title, type, category }) => {
  // console.log(title, type, category);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${category}?api_key=029484b23960c56df6f1d7896bf21408&language=en-US`
    );

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [category],
    queryFn: fetchMovies,
  });

  // console.log(data);
  return (
    <div className="px-3 md:mt-7">
      <Heading title={title} />
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <Swiper {...SwiperConfing}>
            {data.results.map((value) => (
              <SwiperSlide
                key={value.id}
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="400"
              >
                <Link to={`/${type}/details/${value.id}`}>
                  <Card
                    poster={value.poster_path}
                    rating={value.vote_average}
                    title={value.title || value.name}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Slider;
