import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import UpdateBlog from "./UpdateBlog";
import BlogDetail from "./BlogDetail";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CreateCall, DeleteCall } from "../backendcalls/BackendCalls";
const Blog = ({
  title,
  description,
  author,
  image,
  blog_id,
  author_id,
  creater_id,
  getData,
  likes,
  username,
}) => {
  const [update, setUpdate] = useState(false);
  const [details, setDetails] = useState(false);
  const [like, setLike] = useState(false);
  useEffect(() => {
    likes.map((userlike) => {
      if (userlike.userId === author_id && userlike.blogId === blog_id) {
        setLike(true);
      }
    });
  }, []);
  const likeHandler = async () => {
    const checklike = await CreateCall({
      url: "like",
      data: {
        userId: author_id,
        blogId: blog_id,
        userName: username,
      },
    });
    console.log(checklike);
    if (checklike.status === 200) {
      setLike(true);
    } else if (checklike.status === 201) {
      setLike(false);
    }
    getData();
  };
  return (
    <div className="sm:w-[40rem] w-[90%] sm:h-[11rem] h-[26rem] flex sm:flex-row flex-col gap-3 shadow-lg rounded-lg bg-[#1e293b] text-[#e2e8f0]">
      <div className="h-[176px] sm:w-[19rem] w-full">
        <img
          src={image}
          onClick={() => setDetails(true)}
          alt="thumbnail"
          className=" sm:w-[200.933px] h-full w-full sm:object-fill object-cover sm:rounded-bl-lg rounded-tl-lg sm:rounded-tr-none rounded-tr-lg cursor-pointer"
        />
      </div>
      <div className="sm:w-full w-fit sm:h-fit h-full flex flex-col justify-between gap-2 my-3 sm:mr-3 mx-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[19px]">{title}</p>
            {creater_id === author_id && (
              <div className="flex gap-6 text-[#e2e8f0]">
                <FaPen
                  className="hover:text-[#abaeb3] transition-color duration-200 cursor-pointer"
                  onClick={() => setUpdate(true)}
                />
                <AiFillDelete
                  className="text-[19px] hover:text-[#abaeb3] transition-colors duration-200 cursor-pointer"
                  onClick={async () => {
                    await DeleteCall({ url: `deleteBlog/${blog_id}` }).then(
                      () => {
                        getData();
                        toast.success("Blog deleted");
                      }
                    );
                  }}
                />
              </div>
            )}
          </div>
          <p className="sm:block hidden">
            {description.length > 150
              ? `${description.slice(0, 150)}...`
              : description}
          </p>
          <p className="sm:hidden block">
            {description.length > 130
              ? `${description.slice(0, 130)}...`
              : description}
          </p>
        </div>
        <div className=" flex justify-between items-end sm:mt-0 mt-6">
          <p className="mt-2">Author : {author}</p>
          {like ? (
            <div className="flex gap-2 items-center justify-center ">
              <AiFillHeart
                className="text-[19px] shadow-2xl text-[#f55a5a] cursor-pointer"
                onClick={() => likeHandler()}
              />
              <p>{likes.length}</p>
            </div>
          ) : (
            <div className="flex gap-1 items-center justify-center shadow-2xl cursor-pointer">
              <AiOutlineHeart
                className="text-[19px]"
                onClick={() => likeHandler()}
              />
              <p>{likes.length}</p>
            </div>
          )}
        </div>
      </div>
      {update && (
        <UpdateBlog
          title={title}
          description={description}
          image={image}
          id={blog_id}
          setUpdate={setUpdate}
          getData={getData}
        />
      )}
      {details && (
        <BlogDetail
          image={image}
          title={title}
          description={description}
          author={author}
          setDeatils={setDetails}
        />
      )}
    </div>
  );
};

export default Blog;
