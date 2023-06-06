import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { UpdateCall } from "../backendcalls/BackendCalls";
const UpdateBlog = ({ title, description, image, setUpdate, id, getData }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const UpdateData = async (e) => {
    e.preventDefault();
    try {
      const UpdatedBlog = await UpdateCall({
        url: `updateBlog/${id}`,
        data: {
          image: updatedImage,
          title: updatedTitle,
          description: updatedDescription,
        },
      });
      if (UpdatedBlog.status === 200) {
        setUpdate(false);
        getData();
        toast.success("Blog updated");
      } else {
        UpdatedBlog.status === 400 && toast.error("Plear fill all fields");
        UpdatedBlog.status === 401 && toast.error("Please login first");
        UpdatedBlog.status === 402 && toast.error("user not Valid");
        UpdatedBlog.status === 403 && toast.error("This blog does not exist");
        UpdatedBlog.status === 404 &&
          toast.error("You are not allowed to update this blog");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={(e) => UpdateData(e)}
      className=" top-0 bottom-0 left-0 right-0 backdrop-blur-md fixed flex flex-col items-center justify-center"
    >
      <div className="lg:w-[700px] w-[70vw] flex justify-end text-[19px]  mb-3">
        <RxCrossCircled
          onClick={() => setUpdate(false)}
          className="cursor-pointer"
        />
      </div>
      <div className="lg:w-[700px] w-[70vw] flex flex-col gap-6 items-center">
        <input
          type="text"
          placeholder="URL"
          value={updatedImage}
          onChange={(e) => setUpdatedImage(e.target.value)}
          className="w-full h-16 bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3"
        />
        <input
          type="text"
          placeholder="Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="w-full h-16 bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3"
        />
        <textarea
          rows={5}
          type="text"
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          className="w-full h-36 pt-3 bg-[#1e293b] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px] text-[#e2e8f0] pl-3"
        />
        <input
          type="submit"
          value="Update"
          className="bg-[#192332] mt-6 w-fit py-4 px-6 flex items-center justify-center text-[#e2e8f0] font-semibold text-[19px] rounded-xl hover:shadow-xl hover:bg-[#253248] transition-all duration-200"
        />
      </div>
    </form>
  );
};

export default UpdateBlog;
