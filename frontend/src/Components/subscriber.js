// subscribe to mqtt publisher
const mqtt = require("mqtt");
const Axios = require("Axios");

var client = mqtt.connect("mqtt://localhost:1884");
var topic = "test123";
//console.log("clieeeeeeeeent", client);
client.on("message", (topic, message) => {
  //console.log("clientttt", client);
  console.log("retrieved", message.toString());
  // putData(message.toString());
});
let i = 0;
let posted = false;
let id = "";

client.on("connect", () => {
  client.subscribe(topic);
});

const putData = async (message) => {
  console.log("put data called");
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // console.log(parsedMessage);

  try {
    const { data } = await Axios.put("http://localhost:5000/data", {
      Name: message.toString(),
    });

    console.log("data from put message function", data);
  } catch (error) {
    console.log(error.message);
  }
  posted = true;
};

const PostMessage = async (message) => {
  console.log("in post message", "function called");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("data from subs", message);
  try {
    const { data } = await Axios.post(
      "http://localhost:5000/data",
      {
        Name: message.toString(),
      },
      config
    );
  } catch (error) {
    //  console.log(error);
  }
  posted = true;
};
