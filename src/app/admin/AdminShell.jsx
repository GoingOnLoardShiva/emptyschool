"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import clsx from "clsx";
import Adminheader from "./components/Adminheader";

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Adminheader open={open} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main
        className={clsx(
          "transition-all duration-300 ease-in-out p-6 w-full pt-20 min-h-screen",
          // apply left margin only on md+ screens so mobile gets full width
          open ? "md:ml-65" : "md:ml-20"
        )}
        aria-hidden={mobileOpen}
      >
        {children}
      </main>
    </div>
  );
}
