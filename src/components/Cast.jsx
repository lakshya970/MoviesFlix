import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperConfing } from "../config/SwiperConfing";
import Heading from "./Heading";
import fallback from "../assets/fallback.svg";

const imgSM = "https://image.tmdb.org/t/p/w500";

const Cast = ({ cast }) => {
  return (
    <div className="mt-[50px] px-4 ">
      <Heading title={"top Cast"} />
      <Swiper {...SwiperConfing}>
        {cast.map((value, index) => (
          <SwiperSlide key={index}>
            <img
              src={value.profile_path ? imgSM + value.profile_path : fallback}
              alt=""
              className=" aspect-[5/6] object-cover object-center text-white  "
            />
            <div className="text-sm text-center text-white mt-2 font-extralight  ">
              {value.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;
