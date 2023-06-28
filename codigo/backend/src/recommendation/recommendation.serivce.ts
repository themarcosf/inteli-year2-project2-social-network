import { ContentDto } from "./dto/content.dto";
const mqtt = require("mqtt");

const protocol = "mqtt";
const host = "mqtt-dashboard.com";
const port = "8884";
const clientId = `backend_api`;
// const connectUrl = `${protocol}://${host}:${port}`;
const connectUrl = `${protocol}://${host}`;

const IATopic = "IA Recommendation";
const BackendTopic = "Backend API";
// const client = mqtt.connect(connectUrl, {
//   clientId,
//   clean: false,
//   reconnectPeriod: 1,
//   // clean: true,
//   // connectTimeout: 4000,
//   // reconnectPeriod: 1000,
// });

// client.on("connect", () => {
//   console.log("Connected");
//   client.subscribe([BackendTopic], () => {
//     console.log(`Subscribe to topic '${BackendTopic}'`);
//   });
// });
// client.on("connect", () => {
//   console.log("Connected")
// });

let lastMessage = null
// client.on("message", (BackendTopic, payload) => {
//   lastMessage = payload.toString()
//   console.log("Received Message:", BackendTopic, payload.toString());
// });
// console.log("Received Message:", IATopic, payload.toString());

export class RecommendationService {
  async recommend(body: ContentDto) {
    
    // client.publish(IATopic, JSON.stringify(body))
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(lastMessage);
        lastMessage = null
      }, 2000);
    });
  }
}
