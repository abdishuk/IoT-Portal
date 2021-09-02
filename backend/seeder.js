import Lamp from "./Models/Lamp.js";
import Cin from "./Models/Cin.js";
import Descriptor from "./Models/Descriptor.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

import {
  lamp0,
  lamp1,
  lampAll,
  lamp0_Cin,
  lamp_All_Cin,
  lamp1_Cin,
  Lamp0Descriptor,
  Lamp1Descriptor,
  LampAllDescriptor,
} from "./Data/data.js";
connectDB();
const importLampsData = async () => {
  try {
    const Lamp0 = new Lamp(lamp0);
    const Lamp1 = new Lamp(lamp1);
    const LampAll = new Lamp(lampAll);

    const Lamp0Desc = new Descriptor(Lamp0Descriptor);
    const Lamp1Desc = new Descriptor(Lamp1Descriptor);
    const LampAllDesc = new Descriptor(LampAllDescriptor);

    const Lamp0Cin = new Cin(lamp0_Cin);
    const Lamp1Cin = new Cin(lamp1_Cin);
    const LampAllCin = new Cin(lamp_All_Cin);

    await Lamp0Cin.save();
    await Lamp1Cin.save();
    await LampAllCin.save();

    await Lamp0Desc.save();
    await Lamp1Desc.save();
    await LampAllDesc.save();

    await Lamp0.save();
    await Lamp1.save();
    await LampAll.save();

    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importLampsData();
