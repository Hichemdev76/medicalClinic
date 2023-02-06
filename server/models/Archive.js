import mongoose from "mongoose";

const ArchiveSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Archive = mongoose.model("Archive", ArchiveSchema);
export default Archive;
