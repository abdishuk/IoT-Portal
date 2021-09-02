import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
  {
    device: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Device",
    },
    location: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", DataSchema);
export default Data;
