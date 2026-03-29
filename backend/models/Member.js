// models/Member.js
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  plan: { type: String, enum: ["Basic", "Standard", "Premium"], default: "Basic" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  month: { type: String, enum: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], required: true },
}, { timestamps: true });

const Member = mongoose.model("Member", memberSchema);

export default Member;