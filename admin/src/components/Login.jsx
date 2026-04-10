import React, { useState } from "react";
import axios from "axios";

import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        backendUrl + "/api/user/admin",
        { email, password }
      );

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login Successful 🚀");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">

      {/* 🔥 STRIPE TOP BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[65%] bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#2afadf] stripe-shape"></div>

      {/* ✨ Soft fade (important for Stripe feel) */}
      <div className="absolute top-[55%] w-full h-32 bg-gradient-to-b from-transparent via-white/60 to-white blur-2xl"></div>

      {/* 🧊 CARD */}
      <div className="relative bg-white shadow-xl rounded-xl px-8 py-6 max-w-md w-full z-10">
        
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Admin Pannel
        </h1>

        <form onSubmit={onSubmitHandler}>
          
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-600">Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-600">Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;