var mqtt = require("mqtt");
let mes = "";
const connectMqtt = () => {
  var client = mqtt.connect("mqtt://test.mosquitto.org");

  client.on("connect", function () {
    client.subscribe("presence", function (err) {
      if (!err) {
        client.publish("presence", "Hello mqtt");
      }
    });
  });

  client.on("message", function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    mes = message.toString();
    client.end();
  });
  return mes;
};

export default connectMqtt;
