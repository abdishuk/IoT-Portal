import mongoose from "mongoose";
const MessageSchema = mongoose.Schema(
  {
    device_id: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
