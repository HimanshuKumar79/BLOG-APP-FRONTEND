import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreateCall } from "../backendcalls/BackendCalls";

const CreateBlogs = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const savedUserResponse = await CreateCall({
        url: "createBlog",
        data: { image, title, description },
      });
      if (savedUserResponse.status === 200) {
        toast.success("Blog Created");
        navigate("/");
      }
      savedUserResponse.status === 400 && toast.error("Please fill all fields");
      savedUserResponse.status === 401 && toast.error("Please login first");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={(e) => createBlog(e)}
      className="sm:mt-36 mt-28 max-w-[700px] mx-auto flex flex-col gap-6 sm:p-0 p-6"
    >
      <input
        type="text"
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        className="w-full h-16 bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3"
      />
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full h-16 bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3"
      />
      <textarea
        rows={5}
        placeholder="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3 pt-3"
      />
      <input
        type="submit"
        value="Create"
        className="bg-[#1e293b] py-4 px-6 flex items-center justify-center text-[#e2e8f0] font-semibold text-[19px] rounded-xl hover:shadow-xl hover:bg-[#253248] transition-all duration-200"
      />
    </form>
  );
};

export default CreateBlogs;
