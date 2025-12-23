"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSms, FaBars, FaTimes } from "react-icons/fa";

export default function Adminheader({ open = true, mobileOpen = false, setMobileOpen = () => {} }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // simple resize/detection for `md` breakpoint (768px)
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // For mobile: when mobile menu is closed, header should be offset (collapsed)
  const left = isMobile ? (mobileOpen ? 0 : 0) : open ? 260 : 80;
  const width = mobileOpen ? "100%" : `calc(100% - ${left}px)`;
  const zIndex = mobileOpen ? 49 : 50;

  return (
    <div
      className="sidebar-header-first fixed top-0 bg-white p-4 shadow-md flex items-center justify-between transition-all duration-300"
      style={{ left: `${left}px`, width, zIndex }}
    >
      <div className="flex items-center gap-3">
        {/* Mobile toggle - visible only on small screens */}
        {!mobileOpen ? (
          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        ) : (
          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        )}

        <div className="techer-details flex items-center gap-4">
          <div className="image-content">
            <Image
              src="/path/to/teacher/image.jpg"
              alt="Teacher"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="name-details">
            <p className="text-sm text-gray-500">Welcome Back,</p>
            <h1 className="text-xl font-bold">Sir Rohit Sharma</h1>
          </div>
        </div>
      </div>

      <div className="right-top-button-Message bg-blue p-4 rounded-full">
        <FaSms />
      </div>
    </div>
  );
}
