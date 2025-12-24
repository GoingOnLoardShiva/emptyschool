import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  employ_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  subjects: { type: [String], default: [] },
  classes_assigned: { type: [String], default: [] },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export default Teacher;