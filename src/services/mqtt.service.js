const mqtt = require("mqtt");
const { insertDataDeviceDb } = require("../db/data.db");

const host_mqtt = "broker.hivemq.com";
const port_mqtt = "1883";
const clientId = `f4a8e52b-b1c5-4336-81d6-244778996120`;
const connectUrl = `mqtt://${host_mqtt}:${port_mqtt}`;
const deviceId ="647ef8476acc038a2885462d";
const responseMs = {
  code :1
};
// thực hiện tạo connect tới mqtt broker
var mqttClient = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "minh",
  password: "1",
  //password: "Q1uIDvGAJD4YO48B29KICC0xKodyQsHa",
  reconnectPeriod: 1000,
});

mqttClient.once("connect",  () => {
  console.log("Connect to mqtt successfully");
  mqttClient.subscribe(`messages/${deviceId}/attributets`, () => {
    console.log("Subscribe to topic");
  });
});  
  // mqttClient.subscribe(`messages/${deviceId}/attributets`);
  // console.log("Subcribed topic");
  mqttClient.on("message", async (topic, msg) => {
    console.log("ac");
    const message = JSON.parse(msg.toString());
    console.log(`Recived ${message} from ${topic}`);
    //const {rsrp,rsrq,sinr,cellId,longitude,latitude} = message;
    try {
      console.log({deviceId,...message});
      await insertDataDeviceDb({deviceId,...message});
      mqttClient.publish(`messages/${deviceId}/update`,JSON.stringify(responseMs));
    } catch (error) {
      console.log(error);
    }
  });


mqttClient.on("error", function (error) {
  console.log("Unable to connect: " + error);
  process.exit(1);
});

module.exports = mqttClient;
