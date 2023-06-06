import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authType, setAuthType] = useState(true);
  const BASE_URL = "https://blog-mern-app-0ihp.onrender.com";
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = authType ? { email, password } : { name, email, password };
    console.log(data);
    try {
      const savedUserResponse = await fetch(
        `${BASE_URL}/${authType ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("FORM RESPONSE......", savedUserResponse);
      if (savedUserResponse.status === 200) {
        if (authType) {
          navigate("/");
        } else {
          navigate("/login");
        }
        // window.location.reload();
      } else {
        savedUserResponse.status === 400 &&
          toast.error("Please fill all the fields");
        savedUserResponse.status === 401 && toast.error("User not found");
        savedUserResponse.status === 402 && toast.error("Invalid password");
        savedUserResponse.status === 403 && toast.error("Email already in use");
        savedUserResponse.status === 500 && toast.error("Something went wrong");
        savedUserResponse.status === 900 && toast.error("Wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={(e) => submitHandler(e)} className="sm:p-0 p-6">
      <div
        className={`max-w-[600px] max-h-[30rem]  flex flex-col items-center justify-start mx-auto sm:mt-24 mt-16 bg-[#1e293b] ${
          authType ? "pt-20" : "pt-16"
        } gap-6 rounded-xl border-[#e2e8f0] border-[2px]`}
      >
        {authType === false && (
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[90%] mx-auto h-[4rem] pl-3 bg-[#0f172a] text-[#e2e8f0] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px]"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[90%] mx-auto h-[4rem] pl-3 bg-[#0f172a] text-[#e2e8f0] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[90%] mx-auto h-[4rem] pl-3 bg-[#0f172a] text-[#e2e8f0] outline-none border-[#e2e8f0] border-[2px] rounded-xl text-[19px]"
        />
        <input
          type="submit"
          value={authType ? "Login" : "Register"}
          className="bg-[#0f172a] px-9 py-3 rounded-xl text-[#e2e8f0] font-semibold hover:shadow-xl hover:bg-[#253248] transition-all duration-200 mt-7"
        />
        <p
          className="font-semibold text-[#e2e8f0] mb-3 underline cursor-pointer"
          onClick={() => setAuthType(!authType)}
        >
          {authType ? "Don't have an account" : "Already have an account"}
        </p>
      </div>
    </form>
  );
};

export default Login;
