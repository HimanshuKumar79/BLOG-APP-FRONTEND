import Cookies from "js-cookie";
import jwtdecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const NavBar = () => {
  const [shadow, setShadow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useState(false);
  const [infoMenu, setInfoMenu] = useState(false);
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
  const shadowHandler = () => {
    if (window.scrollY >= 90) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };
  window.addEventListener("scroll", shadowHandler);
  const deleteUser = async () => {
    try {
      Cookies.remove("token");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className={`${
        shadow ? "shadow-md transition-shadow duration-200" : ""
      } fixed z-30 top-0 left-0 w-full backdrop-blur-sm py-4 md:block hidden`}
    >
      <nav>
        <ul className="flex max-w-[1080px] mx-auto justify-center gap-9 text-[#e2e8f0] text-[19px]">
          <li className={`${user === false && "pl-12"}`}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>{user && <NavLink to="/create">Create</NavLink>}</li>
          <li>{user && <NavLink to="/myBlogs">My Blogs</NavLink>}</li>
        </ul>
      </nav>
      {user ? (
        <BsPersonCircle
          className="absolute right-[86px] top-4 text-[#e2e8f0] text-[29px]"
          onClick={() => setInfoMenu(!infoMenu)}
        />
      ) : (
        <NavLink
          to={"/login"}
          className="absolute right-6 top-3 text-[#e2e8f0] bg-[#1e293b] py-2 px-5 rounded-2xl"
        >
          LogIn
        </NavLink>
      )}
      {infoMenu && (
        <div className="h-44 w-36 bg-[#1e293b] text-[#e2e8f0] absolute right-7 top-16 rounded-lg text-[12px] px-3 py-3 flex flex-col justify-between">
          <p className="font-semibold text-[15px]">Hi {userInfo.name}</p>
          <div className="flex flex-col gap-1">
            <NavLink
              to={"/"}
              onClick={() => setInfoMenu(false)}
              className={`hover:text-[#c0c2c5] transition-all text-[14px] font-semibold`}
            >
              Home
            </NavLink>
            <NavLink
              to={"/create"}
              onClick={() => setInfoMenu(false)}
              className={`hover:text-[#c0c2c5] transition-all text-[14px] font-semibold`}
            >
              Create
            </NavLink>
            <NavLink
              to={"/myBlogs"}
              onClick={() => setInfoMenu(false)}
              className={`hover:text-[#c0c2c5] transition-all text-[14px] font-semibold`}
            >
              My Blogs
            </NavLink>
          </div>
          <div className=" w-full flex items-center justify-center">
            <p
              className="px-2 py-1 bg-[#cdd2d8] text-black w-fit rounded-xl cursor-pointer hover:bg-[#e4eaf0] transition-colors duration-200"
              onClick={() => deleteUser()}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
