import React, { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { BsPen } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import jwtdecode from "jwt-decode";

const BottomNav = () => {
  const [bottomnav, setBottomnav] = useState(false);
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  useEffect(() => {
    DecodeToken();
  }, []);
  const DecodeToken = async () => {
    try {
      const cookie = Cookies.get("token");
      if (cookie !== undefined) {
        const token = await jwtdecode(String(cookie));
        setUserInfo(token);
        setUser(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-[100vw] bg-[#1e293b] sm:hidden fixed bottom-0 left-0 right-0 h-12 flex items-center justify-center rounded-t-md">
      <div className="w-[90%] text-[#e2e8f0] flex justify-between items-center mx-auto">
        <NavLink to={"/"} className="font-semibold">
          Blog App
        </NavLink>
        {user ? (
          <CgMenuRightAlt
            className="text-[19px]"
            onClick={() => setBottomnav(!bottomnav)}
          />
        ) : (
          <NavLink
            to={"/login"}
            className="text-[#1e293b] py-[6px] px-5 bg-[#9ea7b5] rounded-xl cursor-pointer"
          >
            Login
          </NavLink>
        )}
      </div>
      <div
        className={`h-28 w-full text-[#e2e8f0] fixed bottom-0 ${
          bottomnav ? "translate-y-0" : "translate-y-28"
        } transition-transform duration-[660ms] rounded-t-lg `}
      >
        <ul className="flex justify-evenly items-center  w-full h-full bg-[#1e293b] rounded-t-lg text-[#e2e8f0]">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setBottomnav(false)}
              className="flex flex-col items-center justify-center h-fit w-[69px]"
            >
              <MdOutlineArticle className="text-[19px] cursor-pointer" />
              <p className="font-semibold cursor-pointer">Blogs</p>
            </NavLink>
          </li>
          <li
            className="flex flex-col items-center justify-center h-fit w-[69px]"
            onClick={() => setBottomnav(false)}
          >
            <NavLink
              to={"/create"}
              onClick={() => setBottomnav(false)}
              className="flex flex-col items-center justify-center h-fit w-[69px]"
            >
              <BsPen className="text-[19px] cursor-pointer" />
              <p className="font-semibold cursor-pointer">Create</p>
            </NavLink>
          </li>
          <li
            className="flex flex-col items-center justify-center h-fit w-[69px]"
            onClick={() => setBottomnav(false)}
          >
            <NavLink
              to={"/myBlogs"}
              onClick={() => setBottomnav(false)}
              className="flex flex-col items-center justify-center h-fit w-[69px]"
            >
              <HiOutlineLightBulb className="text-[19px] cursor-pointer" />
              <p className="font-semibold cursor-pointer">My Blogs</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNav;
