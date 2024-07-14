import React from "react";
import { motion } from "framer-motion";
import { IoPlayCircle } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";

const Card = ({ title, poster, rating }) => {
  return (
    <div className="gap-2">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className=" text-white relative rounded-xl gap-2"
      >
        <div className=" overflow-hidden ">
          {poster ? (
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} />
          ) : (
            <div className=" aspect-[4/6] bg-slate-900 font-bold flex justify-center items-center text-7xl rounded-lg">
              NA
            </div>
          )}
        </div>
        <div className="md:opacity-0 md:hover:opacity-100 duration-200 group">
          <div className="absolute top-0 inset-0  bg-gradient-to-t from-black/80"></div>
          <IoPlayCircle
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 duration-200 transition-transform"
            size={50}
          />
          <div className=" absolute bottom-5 px-3">
            <span className="flex gap-2 items-center font-semibold text-yellow-400">
              <TiStarFullOutline size={21} />
              {Number(rating).toFixed(1)}
            </span>
            <h3 className="mt-2 font-semibold">{title}</h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
