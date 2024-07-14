import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Loading from "./Loading";
import { TiStarFullOutline } from "react-icons/ti";
import { FaPlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";

const imgURL = "https://image.tmdb.org/t/p/original";

const HomeSlider = ({ type }) => {
  // console.log(type);
  const fetchMovies = async () => {
    const respons = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=029484b23960c56df6f1d7896bf21408&language=en-US`
    );
    return respons.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [type],
    queryFn: fetchMovies,
  });

  // console.log(data);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          modules={[Autoplay, EffectFade]}
          effect="fade"
        >
          {data.results.map((value, index) => (
            <SwiperSlide key={value.id}>
              <div className="bg-black/50 inset-0 absolute"></div>
              <div
                style={{
                  backgroundImage: `url(${imgURL}${value.backdrop_path})`,
                }}
                className="h-[90vh] bg-cover bg-center pt-[90px] space-y-5 px-4"
              >
                <h1 className="text-white text-3xl font-bold isolate md:text-5xl ">
                  {value.title || value.name}
                </h1>
                <p className="text-white isolate font-normal">
                  {formatDate(value.first_air_date || value.release_date)}
                </p>
                <div className="flex gap-2 items-center pb-6">
                  <span className=" text-yellow-400 isolate flex items-center gap-2">
                    <TiStarFullOutline size={30} />{" "}
                    <span className=" font-bold text-2xl">
                      {Number(value.vote_average).toFixed(1)}
                    </span>
                  </span>

                  <span className="text-white/60 isolate font-semibold ">
                    ({value.vote_count} votes)
                  </span>
                </div>
                <Link to={`/${type}/details/${value.id}`} className="">
                  <button className="text-white flex items-center capitalize isolate gap-2 bg-red-700 px-4 py-2 rounded-full font-semibold hover:scale-95 duration-100 transition-all ease-in hover:bg-red-600">
                    watch now <FaPlay size={14} />
                  </button>
                </Link>
                <div className="text-white isolate">
                  <span className=" font-medium">OverView : </span>
                  <p className=" text-balance font-light md:w-[700px] line-clamp-3">
                    {value.overview}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HomeSlider;
