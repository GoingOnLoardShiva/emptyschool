import dbConnect from "../../../../utilites/db/dbContec";
import Admin from "../../../../utilites/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: admin.uuid, role: admin.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
