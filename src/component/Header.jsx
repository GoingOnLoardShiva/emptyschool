"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CgMenuRound } from "react-icons/cg";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="main-component flex fixed justify-center top-0 right-0 left-0 z-50 bg-transparent">
      <div className="flex flex-row justify-between items-center w-full h-16 px-8  max-w-[800px] rounded-full  text-[#052E16]">
        <div className="header-left font-bold text-lg">
          <Link href="/"><h1>Empty School</h1></Link>
        </div>
        <div className="header-center flex gap-6 hidden md:flex ">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="header-right flex gap-4 hidden md:flex ">
          <Link
            href="/login"
            className="border-gray-400 border  p-2 rounded-full px-6"
          >
            Login
          </Link>
          <Link
            href="/student-login"
            className="border-[#fc792e] border p-2 rounded-bl-2xl rounded-tr-2xl px-6 bg-[#fc792e] "
          >
            Student Login
          </Link>
        </div>
        <div className="mobile-togel md:hidden grid place-items-center">
          <CgMenuRound
            size={30}
            className="md:hidden block text-[#fc792e]"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <div className="mobile-menu flex flex-col absolute top-16 right-0 shadow-lg dropshadow-white-xl bg-white/70 backdrop-blur-md p-4  w-full p-4 shadow-md md:hidden rounded-2xl mt-5">
            <Link href="/" className="p-4 ">
              Home
            </Link>
            <Link href="/about" className="p-4">
              About
            </Link>
            <Link href="/contact" className="p-4 ">
              Contact
            </Link>
            <div className="header-right flex gap-4 ">
              <Link
                href="/login"
                className="border-gray-400 border  p-2 rounded-full px-6"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="border-[#fc792e] border p-2 rounded-bl-2xl rounded-tr-2xl px-6 bg-[#fc792e] "
              >
                Student Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
