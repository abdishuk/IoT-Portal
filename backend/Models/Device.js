import mongoose from "mongoose";
const DeviceSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    Type: {
      required: true,
      type: String,
    },
    ConnectedAssetName: {
      required: true,
      type: String,
    },
    static_Gps_Location: {
      latitude: {
        required: true,
        type: String,
      },
      longitude: {
        required: true,
        type: String,
      },
    },

    Gateway_Name: {
      required: false,
      type: String,
    },
    RuleSetFile: [
      {
        type: String,
      },
    ],

    model: {
      type: String,
      required: true,
    },
    software_version: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("Device", DeviceSchema);
export default Device;
