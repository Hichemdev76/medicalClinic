import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    head: {
      type: String,
      require: true,
    },
    nbrOfWorkers: {
      type: Number,
      default: 0,
    },
    workersIds: Array,
  },
  { timestamps: true }
);
const Service = mongoose.model("Service", ServiceSchema);
export default Service;
