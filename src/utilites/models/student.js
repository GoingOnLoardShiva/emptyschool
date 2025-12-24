import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  registration_id: { type: String, required: true, unique: true },
  admission_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date },
  class_name: { type: String },
  section: { type: String },
  gender: { type: String },
  status: { type: String, enum: ["active", "inactive", "alumni"], default: "active" },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;