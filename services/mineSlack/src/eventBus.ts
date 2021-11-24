import AWS from "aws-sdk";
import { LefthoekEventBus } from "./types";

const eventBridge = new AWS.EventBridge();

const eventBus: LefthoekEventBus = {
  put: async ({ detailType, detail }) => {
    const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

    if (!HANDLER_NAME) {
      throw new Error("The handler name must be set in your environment");
    }

    if (!EVENT_BUS_NAME) {
      throw new Error("The event bus name must be set in your environment");
    }

    const DetailType = detailType;
    const Detail = JSON.stringify(detail, null, 2);
    const EventBusName = process.env.EVENT_BUS_NAME;
    const event = {
      Source: HANDLER_NAME,
      DetailType,
      EventBusName,
      Detail,
    };
    console.log(event);
    const reply = await eventBridge
      .putEvents({
        Entries: [event],
      })
      .promise();
    console.log(HANDLER_NAME, reply);
    return detail;
  },
};

export default eventBus;
