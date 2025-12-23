import React from "react";

export default function Design() {
  return (
    <div className="login-main-container flex flex-col md:flex-row items-center justify-start max-w-[500px] mx-auto mt-40 gap-8 shadow-xl bg-white/70 backdrop-blur-md rounded-2xl">
      <div className="login-component p-10 flex flex-col items-center justify-center w-full">
        <div className="login-top mb-6">
          <h1 className="font-bold text-3xl text-slate-800">Techer Login</h1>
        </div>

        <div className="login-center flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Email or Techer Id"
            className="border border-orange-300 p-2 px-5 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Enter Your Password "
            className="border border-orange-300 p-2 px-5 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="login-bottom">
          <button className="bg-orange-400 text-white px-6 py-2 rounded-bl-2xl rounded-tr-2xl hover:bg-orange-500 transition mt-6 w-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
