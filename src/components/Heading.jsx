import React from "react";

const Heading = ({ title }) => {
  return (
    <div
      // data-aos="fade-right"
      // data-aos-offset="200"
      // data-aos-easing="ease-in-sine"
      // data-aos-duration="400"
      className=" py-4 mt-5 "
    >
      <h1 className=" text-[18px] md:text-2xl font-semibold uppercase text-white   tracking-widest border-b-[3.3px] border-red-600 w-fit px-1">
        {title}
      </h1>
      {/* <div className="bg-red-600 h-[2.5px] mt-1 w-[200px]"></div> */}
    </div>
  );
};

export default Heading;
