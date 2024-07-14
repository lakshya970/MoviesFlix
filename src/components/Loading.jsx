import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className=" bg-transparent h-[85vh] flex justify-center items-center ">
      <Spinner />
    </div>
  );
};

export default Loading;
