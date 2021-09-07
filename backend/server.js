import express from "express";
import Pusher from "pusher";
import dotenv from "dotenv"; // for creating .env file in the root to store environment variables
import connectDB from "./config/db.js";
import asynchandler from "express-async-handler";
import http from "http";
import webSocketServer from "websocket";
import Axios from "axios";
const app = express();
const server = http.createServer(app);

import bodyParser from "body-parser";
import axios from "axios";
import Device from "./Models/Device.js";
import Message from "./Models/Message.js";
import Rule from "./Models/RuleSet.js";

import Data from "./Models/Data.js";
import nodemailer from "nodemailer";
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// import connectDB from "./config/db.js";
connectDB();
app.use(express.json()); // to post json data

const PORT = 5000;

// sending emails

app.post("/send/email/:id", (req, res) => {
  let id = req.params.id;
  const output = `
    <p>You have a new Device Alert</p>
    <h3>Device  Alert</h3>
    
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "nuriya.yussuf2016@gmail.com", // generated ethereal user
      pass: "nuriya2016", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "nuriya.yussuf2016@gmail.com", // sender address
    to: "abdishukri.yussuf2014@gmail.com", // list of receivers
    subject: "Device Alert", // Subject line
    text: `This is to let you know that the device with the device id: ${id}  is out of range`, // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send({ msg: "Email has been sent" });
  });
});

// put data

app.put("/data/:id", async (req, res) => {
  const id = req.params.id;
  const { latitude, longitude } = req.body;
  // const ExistDevice = await Data.findOne({ device });

  const data = await Data.findOne({ device: id });

  try {
    if (data) {
      data.location.latitude = latitude || data.location.latitude;
      data.location.longitude = longitude || data.location.longitude;

      const savedData = await data.save();

      res.send(savedData);
    }

    //  console.log("info", info);
  } catch (error) {
    console.log(error);
  }
});

// find data by device id

app.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Data.findOne({ device: id });
  if (data) {
    res.send({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
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
    res.send(saveRule);
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
  const { MinLat, MinLng, MaxLat, MaxLng, Action } = req.body;
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

    // check if rule for the device already exists

    const exists = await Rule.findOne({ device: req.params.id });

    if (!exists) {
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
        action: Action,
      });
      const saveRule = await rule.save();
      console.log("Rule save");
      console.log(saveRule);
    } else {
      console.log(
        "rule already exists for device.Please Edit it if you wish to."
      );
    }
  } else {
    console.log("device not found");
  }
});

// get rule for a particular device id

app.get("/device/:id/rule", async (req, res) => {
  const id = req.params.id;
  let minLat, maxLat, minLang, maxLang, Action;
  try {
    const rule = await Rule.findOne({ device: id });
    if (rule) {
      minLat = rule.minRange.param1.value;
      minLang = rule.minRange.param2.value;

      maxLat = rule.maxRange.param1.value;
      maxLang = rule.maxRange.param2.value;
      Action = rule.Action;

      res.send({
        minLat,
        maxLat,
        minLang,
        maxLang,
      });
    } else {
      res.send({});
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
    const info = await device?.save();
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

server.listen(5000, console.log("server listening on port " + PORT));
const wsServer = new webSocketServer.server({
  httpServer: server,
});
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

// wsServer.on("request", function (request) {
//   var userId = getUniqueID();
//   console.log(
//     new Date() +
//       " Recieved a new connection from origin " +
//       request.origin +
//       "."
//   );
//   const connection = request.accept(null, request.origin);
//   // clients[userID] = connection;
//   console.log(
//     "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
//   );

//   connection.on("message", function (message) {
//     if (message.type === "utf8") {
//       console.log("Received Message: ", message.utf8Data);

//       // broadcasting message to all connected clients
//       for (key in clients) {
//         clients[key].sendUTF(message.utf8Data);
//         console.log("sent Message to: ", clients[key]);
//       }
//     }
//   });
// });
