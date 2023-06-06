import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const BlogDetail = ({ image, title, description, author, setDeatils }) => {
  return (
    <div className="top-0 bottom-0 left-0 right-0 backdrop-blur-md fixed flex flex-col items-center justify-center gap-2">
      <div className="lg:w-[830px] sm:w-[640px] w-[330px] flex justify-end text-[19px]">
        <RxCrossCircled
          className="cursor-pointer"
          onClick={() => setDeatils(false)}
        />
      </div>
      <div className="bg-[#1e293b] lg:h-[36rem] lg:w-[52rem] sm:h-[26rem] sm:w-[39rem] w-[20rem] h-[33rem] rounded-md flex sm:flex-row flex-col">
        <img
          src={image}
          alt="Thumbnail"
          className="w-full h-full object-cover sm:rounded-tl-md sm:rounded-bl-md rounded-lg"
        />
        <div className="flex flex-col p-5 w-full h-full justify-between">
          <div className="flex flex-col gap-6 sm:h-fit h-[16rem]">
            <p className="font-semibold text-[23px]">{title}</p>
            <p className="text-[16px] overflow-auto h-[16rem]">{description}</p>
          </div>
          <div className="w-full flex justify-end lg:mt-[100px] sm:t-[30px] sm:mt-0 mt-6">
            <p>Author : {author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
