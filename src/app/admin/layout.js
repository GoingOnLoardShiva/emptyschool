export const runtime = "nodejs"; // 🔥 REQUIRED

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminShell from "./AdminShell";  
export const metadata = {
  title: "Admin Panel",
};

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  // const token = cookieStore.get("auth_token")?.value;
  const token = cookieStore.get("token")?.value;

  // No token → login
  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Role check
    if (decoded.role !== "admin") {
      redirect("/403");
    }
  } catch (error) {
    // Invalid / expired token
    redirect("/login");
  }

  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
