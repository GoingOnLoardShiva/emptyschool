"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Design() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields are required");

    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/admin-routes/admin-login",
        { email, password },
        { timeout: 8000 } // ⏱️ prevent hanging request
      );

      if (res.status === 200) {
        router.push("/admin/dashboard"); // ✅ proper redirect
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Try again.";
      alert(message);
    } finally {
      setIsLoading(false); // ✅ always runs
    }
  };
  //test set admin

  const handleTestAdminSet = async () => {
    try {
      const res = await axios.post("/api/admin-routes/test-admin-set", {}, { timeout: 8000 });
      if (res.status === 200) {
        alert("Test admin account created successfully.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to create test admin account.";
      alert(message);
    }
  };

  return (
    <div className="login-main-container flex flex-col md:flex-row items-center justify-start max-w-[500px] mx-auto mt-40 gap-8 shadow-xl bg-white/70 backdrop-blur-md rounded-2xl">
      <div className="login-component p-10 flex flex-col items-center justify-center w-full">
        <div className="login-top mb-6">
          <h1 className="font-bold text-3xl text-slate-800">Admin Login</h1>
        </div>

        <div className="login-center flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Email Address "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-orange-300 p-2 px-5 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Enter Your Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-orange-300 p-2 px-5 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        {isLoading && (
          <div className="mt-6 flex justify-center hidden" id="loader">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-white/40 backdrop-blur-md"></div>
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-500"></div>
            </div>
          </div>
        )}
        {/* <div className="mt-6 flex justify-center hidden" id="loader" >
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-white/40 backdrop-blur-md"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-500"></div>
          </div>
        </div> */}

        <div className="login-bottom">
          <button
          onClick={handleLogin}
            className="bg-orange-400 text-white px-6 py-2 rounded-bl-2xl rounded-tr-2xl hover:bg-orange-500 transition mt-6 w-full"
          >
            Login
          </button>
        </div>
      </div>
      <div className="test-admin-set">
        <button onClick={handleTestAdminSet} className="text-orange-500 ">
          Setup Test Admin Account
        </button>

      </div>
    </div>
  );
}
