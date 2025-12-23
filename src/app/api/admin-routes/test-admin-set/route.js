import dbConnect from "../../../../utilites/db/dbContec";
import Admin from "../../../../utilites/models/admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
//uuidv4
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      console.log("db not connected");
      return NextResponse.json(
        { message: "Database connection failed." },
        { status: 500 }
      );
    }

    const uuid = uuidv4();
    const email = "ifyouthinkiamher@gmail.com";
    const password = "Admin@1234";
    const name = "Test Admin";
    const role = "admin";

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Test admin account already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      uuid,
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();

    return NextResponse.json(
      { message: "Test admin account created successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create test admin:", error);
    return NextResponse.json(
      { message: "Failed to create test admin account.", error: error.message },
      { status: 500 }
    );
  }

  // console.log("Database connected successfully.");

  // const email = "ifyouthinkiamher@gmail.com";
  // const password = "Admin@1234";
  // const name = "Test Admin";
  // console.log(email, password, name);
  // return NextResponse.json(
  //   { message: "Test admin account creation endpoint hit successfully." },
  //   { status: 200 }
  // );
}
