import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
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
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    lineOfWork: {
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
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
