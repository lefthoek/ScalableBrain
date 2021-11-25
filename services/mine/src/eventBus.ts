import AWS from "aws-sdk";

import type { LefthoekEventBus } from "./types/adapters";

const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

const eventBridge = new AWS.EventBridge();

const eventBus: LefthoekEventBus = {
  put: async ({ detailType, detail }) => {
    if (!HANDLER_NAME) {
      throw new Error("The handler name must be set in your environment");
    }

    if (!EVENT_BUS_NAME) {
      throw new Error("The event bus name must be set in your environment");
    }

    const DetailType = detailType;
    const Detail = JSON.stringify(detail, null, 2);
    const event = {
      Source: HANDLER_NAME,
      DetailType,
      EventBusName: EVENT_BUS_NAME,
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
