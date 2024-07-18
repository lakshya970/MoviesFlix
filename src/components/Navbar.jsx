import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { links } from "../constants";
import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// const variants = {
//   open: { opacity: 1, x: 0 },
//   closed: { opacity: 0, x: "-100%" },
// };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {/* pc navbar  */}
      <nav className="hidden md:flex justify-between items-center px-10  h-[70px] sticky top-0 z-20 bg-black text-white">
        <div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logo} alt="" className="w-[140px]" />
          </Link>
        </div>
        <div className="flex gap-5 uppercase font-semibold items-center">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center border border-neutral-600 px-2 py-2 rounded-md w-[250px] text-neutral-400 "
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies"
                className=" bg-transparent focus:outline-none font-light text-sm w-full placeholder:text-neutral-400"
              />
              <IoSearch />
            </form>
          </div>
          {links.map(({ name, to, id }) => (
            <NavLink
              to={to}
              key={id}
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-600" : "text-white"
                } hover:scale-105 duration-100 ease-in transition-all`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </nav>
      {/* mobile navbar  */}
      <nav className="md:hidden flex justify-between  px-4 h-[60px] items-center sticky top-0 z-20 bg-black">
        <div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logo} alt="" className="w-[100px]" />
          </Link>
        </div>
        <div className="text-red-600 flex items-center">
          <div className="mr-6 text-red-600 ">
            <IoSearch
              size={22}
              className=" cursor-pointer isolate"
              onClick={() => setClick(!click)}
            />
            <div
              className={`bg-black/50  h-screen absolute inset-0 top-0 ${
                click ? "scale-100" : "scale-0"
              }   `}
              onClick={() => setClick(false)}
            ></div>
            <div className={`absolute left-0 w-full px-3 top-[70px] `}>
              <form
                onSubmit={handleSubmit}
                // onClick={() => setClick(false)}
                className={`flex items-center  bg-white py-2 px-4 rounded-lg  isolate ${
                  click ? "scale-100" : "scale-0"
                }`}
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation(false)}
                  placeholder="Search movie"
                  className="w-full bg-transparent focus:outline-none "
                />

                <IoSearch
                  size={22}
                  className=" cursor-pointer"
                  onClick={() => setClick(!click)}
                />
              </form>
            </div>
          </div>
          <div
            className={`bg-black/50  h-screen absolute ${
              isOpen ? "inset-0" : "hidden"
            }`}
          ></div>
          {isOpen ? (
            <IoCloseOutline
              size={21}
              onClick={() => setIsOpen(!isOpen)}
              className=" isolate cursor-pointer"
            />
          ) : (
            <RxHamburgerMenu
              size={23}
              className=" isolate cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

          <motion.div
            className={`bg-black h-screen absolute inset-y-0 py-8 px-12 gap-8 font-semibold  flex-col w-80 flex justify-center text-xl md:hidden uppercase duration-300 ease-in-out z-30 ${
              isOpen ? "left-0" : "-left-full"
            } `}
            onClick={() => setIsOpen(false)}
          >
            {links.map(({ name, to, id }) => (
              <NavLink
                to={to}
                key={id}
                //   className={`text-white font-semibold text-xl uppercase tracking-widest
                // `}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-600" : "text-white"
                  } hover:scale-105 duration-100 ease-in transition-all `
                }
                // onClick={() => isOpen(false)}
              >
                {name}
              </NavLink>
            ))}
          </motion.div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
