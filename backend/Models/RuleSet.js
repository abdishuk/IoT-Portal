import mongoose from "mongoose";
const RuleSchema = mongoose.Schema(
  {
    device: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Device",
    },
    minRange: {
      param1: {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
      param2: {
        type: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    },
    maxRange: {
      param1: {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
      param2: {
        type: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rule = mongoose.model("Rule", RuleSchema);
export default Rule;
