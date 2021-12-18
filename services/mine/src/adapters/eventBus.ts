import { EventBridge } from "aws-sdk";
import type { LefthoekEventBus } from "@service_types/adapters";
import { LefthoekEvent } from "@service_types/events";

class eventBus implements LefthoekEventBus {
  handler_name: string;
  event_bus_name: string;
  event_bridge: AWS.EventBridge;

  constructor({
    handler_name,
    event_bus_name,
  }: {
    handler_name?: string;
    event_bus_name?: string;
  }) {
    if (!handler_name) {
      throw new Error("The handler name must be set in your environment");
    }

    if (!event_bus_name) {
      throw new Error("The event bus name must be set in your environment");
    }

    this.handler_name = handler_name;
    this.event_bus_name = event_bus_name;
    this.event_bridge = new EventBridge();
  }

  async put({ detailType, detail }: LefthoekEvent) {
    const DetailType = detailType;
    const Detail = JSON.stringify(detail, null, 2);
    const event = {
      Source: this.handler_name,
      DetailType,
      EventBusName: this.event_bus_name,
      Detail,
    };
    const reply = await this.event_bridge
      .putEvents({
        Entries: [event],
      })
      .promise();
    console.log(this.handler_name, reply);
    return detail;
  }
}

export default eventBus;
