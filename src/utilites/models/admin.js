import mongoose from "mongoose";
import { NextResponse } from "next/server";
// Define the Admin schema
const adminSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});
// Create and export the Admin model
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin; 