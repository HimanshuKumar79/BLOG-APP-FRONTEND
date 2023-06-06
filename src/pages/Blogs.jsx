import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Cookies from "js-cookie";
import jwtdecode from "jwt-decode";
import { ReadCall } from "../backendcalls/BackendCalls";
const Blogs = () => {
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
    const blogs = await ReadCall({ url: "getBlogs" });
    setBlogs(blogs);
  };
  return (
    <div className="max-w-[1080px] mx-auto flex flex-col items-center flex-wrap md:my-16 gap-6 mt-3 mb-16">
      {blogs ? (
        blogs.map((blog) => {
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
              key={blog._id}
              likes={blog.likes}
              username={userInfo.name}
            />
          );
        })
      ) : (
        <div className="pt-36 text-white font-semibold justify-center items-center">
          No Blogs Available
        </div>
      )}
    </div>
  );
};

export default Blogs;
