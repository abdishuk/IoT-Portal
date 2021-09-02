import express from "express";
import Pusher from "pusher";
import dotenv from "dotenv"; // for creating .env file in the root to store environment variables
import connectDB from "./config/db.js";
import asynchandler from "express-async-handler";

import Axios from "axios";
const app = express();

import bodyParser from "body-parser";
import axios from "axios";
import Device from "./Models/Device.js";
import Message from "./Models/Message.js";
import Rule from "./Models/RuleSet.js";

import Data from "./Models/Data.js";
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// import connectDB from "./config/db.js";
connectDB();
app.use(express.json()); // to post json data

const PORT = 5000;

const pusher = new Pusher({
  appId: "1258337",
  key: "938b0f8615346546359f",
  secret: "c65be5216157dabcdf16",
  cluster: "eu",
  useTLS: true,
});

// put data
app.put("/data", async (req, res) => {
  console.log("put req");
  // const { location } = req.body;
  try {
    const message = await Message.findById("612da3afabb33331d040f481");

    // const device = await Data.findById("612cb2d1f0a8562f1872ca98");
    // if (device) {
    //   device.location.latitude = location.latitude || device.location.latitude;
    //   device.location.longitude =
    //     location.longitude || device.location.longitude;

    //   //   console.log(device);
    // }

    // await device.save().then((data) => {
    //   pusher.trigger("new-info", "new-post", {
    //     data,
    //   });
    // });
    const { Name } = req.body;
    if (message) {
      message.Name = Name;
    } else {
      console.log("not found");
    }
    const { data } = await message.save();
    if (data) {
      pusher.trigger("new-info", "new-post", {
        data,
      });
    }
    console.log("successfully put");
  } catch (error) {
    console.log("error ");
    // }
  }
});

// post data

app.post("/data", async (req, res) => {
  console.log("route hit");
  // const { location, device } = req.body;
  // const ExistDevice = await Data.findOne({ device });

  try {
    const { device_id, latitude, longitude } = req.body;
    const info = new Message({
      device_id,
      latitude,
      longitude,
    });
    // await data.save();

    const { data } = await info.save();

    res.send(data);

    //  console.log("info", info);
  } catch (error) {
    //  console.log("eror");
  }
});

// find devices

app.get("/data/find", async (req, res) => {
  const foundData = await Message.find({});

  res.send(foundData);
});

// put a rule for a specific device

app.put("/device/rule/:id", async (req, res) => {
  const rule = await Rule.findOne({ device: req.params.id });
  const { MinLat, MinLng, MaxLat, MaxLng } = req.body;

  if (rule) {
    rule.minRange.param1.value = MinLat || rule.minRange.param1.value;
    rule.minRange.param2.value = MinLng || rule.minRange.param2.value;
    rule.maxRange.param1.value = MaxLat || rule.maxRange.param1.value;
    rule.maxRange.param2.value = MaxLng || rule.maxRange.param2.value;

    const saveRule = await rule.save();
    console.log("Rule save");
    console.log(saveRule);
  } else {
    console.log("rule not found");
  }
});

// add new device
app.post("/device/add_device", async (req, res) => {
  console.log("route hit");
  try {
    const {
      Name,
      Type,
      ConnectedAssetName,
      category,
      Gateway_Name,
      model,
      latitude,
      longitude,
    } = req.body;

    const createdInfo = new Device({
      Name: Name,
      Type: Type,
      ConnectedAssetName,
      category,
      Gateway_Name: Gateway_Name === "" ? Gateway_Name : "Device is a gateway",
      model,
      static_Gps_Location: {
        latitude,
        longitude,
      },
    });

    const data = await createdInfo.save();
    console.log(data);

    const initData = new Data({
      device: data._id,
      location: { latitude: latitude, longitude: longitude },
    });

    const info = await initData.save();
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

//

//  post a rule set for a specific device

app.post("/device/rule/:id", async (req, res) => {
  const device = await Device.findById(req.params.id);
  const { MinLat, MinLng, MaxLat, MaxLng } = req.body;
  if (device) {
    const pr1 = {
      type: "latitude",
      value: MinLat.toString(),
    };
    const pr2 = {
      type: "longitude",
      value: MinLng.toString(),
    };

    const p1 = {
      type: "latitude",
      value: MaxLat.toString(),
    };

    const p2 = {
      type: "longitude",
      value: MaxLng,
    };

    const rule = new Rule({
      device: req.params.id,
      minRange: {
        param1: pr1,

        param2: pr2,
      },
      maxRange: {
        param1: p1,
        param2: p2,
      },
    });
    const saveRule = await rule.save();
    console.log("Rule save");
    console.log(saveRule);
  } else {
    console.log("device not found");
  }
});

// get rule for a particular device id

app.get("/device/:id/rule", async (req, res) => {
  const id = req.params.id;
  let minLat, maxLat, minLang, maxLang;
  try {
    const rule = await Rule.findOne({ device: id });
    if (rule) {
      minLat = rule.minRange.param1.value;
      minLang = rule.minRange.param2.value;

      maxLat = rule.maxRange.param1.value;
      maxLang = rule.maxRange.param2.value;

      res.send({
        minLat,
        maxLat,
        minLang,
        maxLang,
      });
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// add new device
app.post("/device/add_device", async (req, res) => {
  console.log("route hit");
  try {
    const {
      Name,
      Type,
      ConnectedAssetName,
      category,
      Gateway_Name,
      model,
      latitude,
      longitude,
    } = req.body;

    const createdInfo = new Device({
      Name: Name,
      Type: Type,
      ConnectedAssetName,
      category,
      Gateway_Name: Gateway_Name === "" ? Gateway_Name : "Device is a gateway",
      model,
      static_Gps_Location: {
        latitude,
        longitude,
      },
    });

    const data = await createdInfo.save();
    console.log(data);

    const initData = new Data({
      device: data._id,
      location: { latitude: latitude, longitude: longitude },
    });

    const info = await initData.save();
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

// edit a divice

app.put("/device/:id/edit", async (req, res) => {
  const device = await Device.findById(req.params.id);
  const {
    Name,
    Type,
    ConnectedAssetName,
    category,
    Gateway_Name,
    model,
    latitude,
    longitude,
  } = req.body;
  try {
    console.log(device);
    if (device) {
      device.Name = Name || device.Name;
      device.Type = Type || device.Type;
      device.ConnectedAssetName =
        ConnectedAssetName || device.ConnectedAssetName;
      device.category = category || device.category;
      device.Gateway_Name =
        Gateway_Name === ""
          ? "Device is a gateway"
          : Gateway_Name || device.Gateway_Name;
      device.model = model || device.model;
      device.static_Gps_Location.latitude =
        latitude || device.static_Gps_Location.latitude;
      device.static_Gps_Location.longitude =
        longitude || device.static_Gps_Location.longitude;
    } else {
      console.log("device not found");
    }
    console.log("savedDevice", device);
    const info = await device.save();
    res.send(info);
  } catch (error) {
    console.log(error);
  }
});

//edit latitude,longitude of a device

app.put("/device/:id/LatLngedit", async (req, res) => {
  const device = await Device.findById(req.params.id);
  const data = await Data.findOne({
    device: req.params.id,
  });
  const { latitude, longitude } = req.body;
  try {
    console.log(device);
    if (data) {
      data.location.latitude = latitude || data.location.latitude;
      data.location.longitude = longitude || data.location.latitude;
    } else {
      console.log("data not found");
    }
    if (device) {
      device.static_Gps_Location.latitude =
        latitude || device.static_Gps_Location.latitude;
      device.static_Gps_Location.longitude =
        longitude || device.static_Gps_Location.longitude;
    } else {
      console.log("device not found");
    }
    const info = await device.save();
    const r = await data.save();

    // check whether valuers are ın the range accordıng to rule set

    console.log(r);
    res.send({ info, r });
  } catch (error) {
    console.log(error);
  }
});

// find a device by Id

app.get("/device/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const device = await Device.findById(id);
    if (device) {
      res.send(device);
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// get All devices routes
// get /device/all_devices

app.get("/devices/all_devices", async (req, res) => {
  console.log("reqsss");
  try {
    const devices = await Device.find();
    console.log(devices);
    res.send(devices);
  } catch (error) {
    console.log(error);
  }
});

// delete a device by id

app.delete(
  "/device/:id",
  asynchandler(async (req, res) => {
    const device = await Device.findById(req.params.id);
    if (device) {
      await device.remove();
      res.json({
        message: "device removed",
      });
    } else {
      res.status(404);
      throw new Error("device not found");
    }
  })
);

app.listen(5000, console.log("server listening on port " + PORT));
