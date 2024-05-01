import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  phNumber: { type: Number, unique: true },
  email: { type: String, unique: true },
  designation: String,
  password: String,
  dept: String,
});

const StaffModel = mongoose.model("staff", StaffSchema);

export { StaffModel };
