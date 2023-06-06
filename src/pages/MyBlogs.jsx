import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Cookies from "js-cookie";
import jwtdecode from "jwt-decode";
import { ReadCall } from "../backendcalls/BackendCalls";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    DecodeToken();
    getData();
  }, []);
  const DecodeToken = async () => {
    try {
      const cookie = Cookies.get("token");
      if (cookie !== undefined) {
        const token = await jwtdecode(String(cookie));
        setUserInfo(token);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    try {
      const blogs = await ReadCall({ url: "getBlogs" });
      setBlogs(blogs);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-[1080px] mx-auto flex flex-col items-center flex-wrap sm:mt-16 mt-6 gap-6 sm:mb-8 mb-16">
      {blogs ? (
        blogs.map((blog) => {
          if (blog.author_id === userInfo.id) {
            return (
              <Blog
                title={blog.title}
                description={blog.description}
                author={blog.author}
                image={blog.image}
                author_id={userInfo.id}
                creater_id={blog.author_id}
                blog_id={blog._id}
                getData={getData}
                likes={blog.likes}
                key={blog._id}
                username={userInfo.name}
              />
            );
          }
        })
      ) : (
        <div className="pt-36 text-white font-semibold justify-center items-center">
          No Blogs Available
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
