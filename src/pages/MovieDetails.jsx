import React, { useEffect } from "react";
import axios from "axios";
import Haeding from "../components/Heading";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import Card from "../components/Card";
import { TiStarFullOutline } from "react-icons/ti";
import Heading from "../components/Heading";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SwiperConfing } from "../config/SwiperConfing";
import Iframe from "react-iframe";

const imgURL = "https://image.tmdb.org/t/p/original";
const imgSM = "https://image.tmdb.org/t/p/w500";

const MovieSlider = ({ movies, title }) => {
  return (
    <div className="space-y-4 px-4">
      <Heading title={title} />
      <Swiper {...SwiperConfing}>
        {movies.map((value) => (
          <SwiperSlide key={value.id}>
            <Link to={`/movie/details/${value.id}`}>
              <Card
                poster={value.poster_path}
                rating={value.vote_average}
                title={value.title || value.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=029484b23960c56df6f1d7896bf21408&append_to_response=images,videos,casts,similar_movies,recommendations`
    );

    return response.data;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: fetchMovies,
  });

  console.log(data);
  return (
    <div className="">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <div
            style={{
              backgroundImage: `url(${imgURL}${data.backdrop_path})`,
            }}
            className=" bg-center bg-cover bg-no-repeat  relative"
          >
            <div className="bg-black/50 inset-0 top-0 absolute"></div>
            <div className=" isolate p-10 md:items-start gap-10 md:flex justify-center">
              <div className="md:w-[100vw]">
                <img
                  src={imgSM + data.poster_path}
                  alt=""
                  className="w-full md:aspect-[4/6] "
                />
              </div>
              <div className="text-white mt-10 space-y-4 ">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {data.title || data.name}
                </h1>
                <p className=" font-semibold">{data.tagline}</p>
                <p className="text-sm font-light">{data.release_date}</p>
                <h2 className=" capitalize">
                  runtime :{" "}
                  <span className="text-red-600">{data.runtime}m</span>
                </h2>
                <div className="gap-3 space-x-3">
                  {data.genres.map((item) => (
                    <span
                      key={item.id}
                      className="bg-red-700 text-sm px-2 py-1 rounded-md"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
                <span className=" text-yellow-400 isolate flex items-center gap-2">
                  <TiStarFullOutline size={30} />{" "}
                  <span className=" font-bold text-2xl">
                    {Number(data.vote_average).toFixed(1)}
                  </span>
                  <span className="text-white/70 font-semibold">
                    ({data.vote_count})
                  </span>
                </span>
                <div>
                  <span className=" font-semibold">Overview :</span>
                  <div className=" line-clamp-2 md:line-clamp-4">
                    {data.overview}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Cast slider */}
          <Cast cast={data.casts.cast} />
          {/* videos  */}
          {data.videos.results.lenght !== 0 && (
            <div className="px-3 ">
              <Heading title="videos" />
              <Swiper
                slidesPerView={1}
                navigation={true}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination, Navigation]}
              >
                {data.videos.results.map((value, index) => (
                  <SwiperSlide key={index}>
                    <Iframe
                      className=" aspect-video md:h-[80vh] w-full"
                      src={`https://www.youtube.com/embed/${value.key}`}
                    ></Iframe>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* backdrops */}
          {data.images.backdrops.lenght !== 0 && (
            <div className="px-3 py-4">
              <Heading title="backdrops" />
              <Swiper
                slidesPerView={1}
                pagination={{ dynamicBullets: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
              >
                {data.images.backdrops.map((value, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imgURL + value.file_path}
                      alt=""
                      className="w-auto object-cover object-center w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* logos  */}
          {data.images.logos.lenght !== 0 && (
            <ImageSlider images={data.images.logos} title={"logos"} />
          )}
          {/* posters  */}
          {data.images.posters.lenght !== 0 && (
            <ImageSlider images={data.images.posters} title={"posters"} />
          )}
          {/* recommendations  */}
          {data.recommendations.results.lenght !== 0 && (
            <MovieSlider
              movies={data.recommendations.results}
              title={"recommendations"}
            />
          )}
          {/* 
similar_movies  */}
          {data.similar_movies.results.lenght !== 0 && (
            <MovieSlider
              movies={data.similar_movies.results}
              title={"similar movies"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

export const ImageSlider = ({ images, title }) => {
  return (
    <div className="px-3">
      <Heading title={title} />
      <Swiper
        modules={[Pagination]}
        slidesPerView={2}
        pagination={{ dynamicBullets: true }}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="pb-6"
      >
        {images.map((value, index) => (
          <SwiperSlide key={index}>
            <img src={imgSM + value.file_path} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
