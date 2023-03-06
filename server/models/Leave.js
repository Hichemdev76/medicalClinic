import mongoose, { Mongoose } from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    leaveCause: {
      type: String,
      require: true,
    },
    startingDate: {
      type: String,
      require: true,
    },
    expirationDate: {
      type: String,
      require: true,
    },
    nbrOfDays: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["review", "accepted", "refused"],
      default: "review",
    },
    type: {
      type: String,
      enum: ["paid", "unpaid", "maternal"],
      default: "paid",
    },
  },
  { timestamps: true }
);
const Leave = mongoose.model("Leave", LeaveSchema);
export default Leave;
