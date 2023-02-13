import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "serviceChef", "admin"],
      default: "user",
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    dateOfBirth: {
      type: String,
    },
    sex: {
      type: String,
    },
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    level: {
      type: Number,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    payedLeaveDaysLeft: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
