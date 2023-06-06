import React from "react";
import Blogs from "./Blogs";
import { Route, Routes } from "react-router-dom";
import CreateBlogs from "./CreateBlogs";
import MyBlogs from "./MyBlogs";
import Login from "../auth/Login";

const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Blogs />} />
        <Route exact path="/create" element={<CreateBlogs />} />
        <Route exact path="/myBlogs" element={<MyBlogs />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default HomePage;
