import { EventBridge as EB } from "aws-sdk";
import type { EventBus, GenericEvent } from "@lefthoek/types";

const event_bridge = new EB();

class EventBridgeAdapter<T extends GenericEvent> implements EventBus<T> {
  handler_name: string;
  event_bus_name: string;

  constructor({
    handler_name,
    event_bus_name,
  }: {
    handler_name: string | undefined;
    event_bus_name: string | undefined;
  }) {
    if (!handler_name) {
      throw new Error("The handler name needs to be set in your environment");
    }

    if (!event_bus_name) {
      throw new Error("The event bus name needs to be set in your environment");
    }

    this.handler_name = handler_name;
    this.event_bus_name = event_bus_name;
  }

  async put({ detailType, detail }: T) {
    const DetailType = detailType;
    const Detail = JSON.stringify(detail, null, 2);
    const event = {
      Source: this.handler_name,
      DetailType,
      EventBusName: this.event_bus_name,
      Detail,
    };
    const reply = await event_bridge
      .putEvents({
        Entries: [event],
      })
      .promise();
    console.log("INFO", this.handler_name, reply);
    return detail;
  }
}

export { EventBridgeAdapter };
