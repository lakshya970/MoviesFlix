import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-4 py-4 border-t border-slate-100/30 space-y-2">
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src={logo} alt="" className="w-[100px] cursor-pointer" />
      </div>
      <div className="text-slate-400/90 font-extralight text-sm">
        &copy; copyright @lakshyamahwar
      </div>
    </footer>
  );
};

export default Footer;
