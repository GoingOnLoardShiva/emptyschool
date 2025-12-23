"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="landing-main-component">
      <div className="bg-[url('/landing-image/school-image.jpg')] bg-cover bg-center h-[500px] md:h-[775px] w-full absolute top-0 left-0 z-0"></div>

      <div className="landing-main-component relative overflow-hidden">

        {/* Content */}
        <div className="landing-content relative z-10 flex flex-col md:flex-row items-center justify-start max-w-[1000px] mx-auto py-40 md:py-50 px-4 md:px-0 gap-8">
          <div className="landing-text flex flex-col gap-6 md:w-1/2 text-center md:text-left ">
          <div className="tag-link">
            <Link href="/admission" className="text-sm bg-white/70 backdrop-blur-md px-4 py-2 rounded-bl-2xl rounded-tr-2xl shadow-lg dropshadow-white-xl text-[#052E16] hover:bg-white transition">Open Admission</Link>
          </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#fc792e]">
              Welcome to Empty School
            </h1>

            <p className="text-lg text-[#052E16] shadow-lg dropshadow-white-xl bg-white/70 backdrop-blur-md p-4 rounded-bl-4xl rounded-tr-4xl">
              Empowering Education Through Technology. Join Us in Shaping the
              Future of Learning.
            </p>

            <div className="landing-buttons flex gap-4 justify-center md:justify-start">
              <button className="bg-[#fc792e] text-white px-6 py-2 rounded-bl-2xl rounded-tr-2xl hover:bg-[#e66a1c] transition">
                Get Started
              </button>
              <button className="border border-gray-400 px-6 py-2 bg-[#f4feff] text-[#052E16] rounded-bl-2xl rounded-tr-2xl hover:bg-[#e3f0f1] transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
