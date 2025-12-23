"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import {
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaMoneyBillWave,
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: FaSchool, path: "/admin/dashboard" },
  { label: "Students", icon: FaUserGraduate, path: "/admin/students" },
  { label: "Teachers", icon: FaChalkboardTeacher, path: "/admin/teachers" },
  { label: "Parents", icon: FaUsers, path: "/admin/parents" },
  { label: "Classes", icon: FaBook, path: "/admin/classes" },
  { label: "Attendance", icon: FaClipboardList, path: "/admin/attendance" },
  { label: "Fees", icon: FaMoneyBillWave, path: "/admin/fees" },
  { label: "Settings", icon: FaCog, path: "/admin/settings" },
];

export default function AdminSidebar({ open = true, setOpen = () => {}, mobileOpen = false, setMobileOpen = () => {} }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, setMobileOpen]);

  const handleLogout = () => {
    // Ideally call an API to clear auth cookie; for now, redirect to login
    router.push("/login");
  };

  // Mobile overlay sidebar
  const mobileSidebar = (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: mobileOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-65 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-lg z-50 flex flex-col md:hidden"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-3 overflow-hidden">
            <FaSchool className="text-indigo-600 text-2xl shrink-0" />

            <span className="text-lg font-bold text-gray-800">School Admin</span>
          </div>

          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-1">
          {menu.map(({ label, icon: Icon, path }) => (
            <Link
              key={label}
              href={path}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all overflow-hidden",
                pathname === path ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50"
              )}
              aria-current={pathname === path ? "page" : undefined}
            >
              <Icon className="text-xl shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 hover:text-red-600 w-full">
            <FaSignOutAlt className="text-xl" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );

  return (
    <>
      {mobileOpen && mobileSidebar}

      <motion.aside
        animate={{ width: open ? 260 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-sm fixed left-0 top-0 z-50 hidden md:flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-3 overflow-hidden">
            <FaSchool className="text-indigo-600 text-2xl shrink-0" />

            <span
              className={`
      text-lg font-bold text-gray-800
      transition-all duration-300 ease-in-out
      whitespace-nowrap
      ${open ? "opacity-100 max-w-50" : "opacity-0 max-w-0"}
    `}
            >
              School Admin
            </span>
          </div>

          <button onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
            <FaBars className="text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4 px-2 space-y-1">
          {menu.map(({ label, icon: Icon, path }) => (
            <Link
              key={label}
              href={path}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all overflow-hidden",
                pathname === path ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50"
              )}
              aria-current={pathname === path ? "page" : undefined}
            >
              {/* Icon (never shrink) */}
              <Icon className="text-xl shrink-0" />

              {/* Text (always rendered, animated) */}
              <span
                className={`
          text-sm font-medium whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${open ? "opacity-100 max-w-40" : "opacity-0 max-w-0"}
        `}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 hover:text-red-600 w-full">
            <FaSignOutAlt className="text-xl" />
            {open && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
