import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    head: {
      type: String,
    },
    workersIds: Array,
  },
  { timestamps: true }
);
const Service = mongoose.model("Service", ServiceSchema);
export default Service;
