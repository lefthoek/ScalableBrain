import { Handler as AWSHandler } from "aws-lambda";
import { EventBridgeAdapter } from "./EventBridgeAdapter";

import type { Handler, Services, GenericEvent } from "@lefthoek/types";

const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

function serviceHandlerWrapper<I extends GenericEvent, O extends GenericEvent>(
  handler: Handler<I, O, Services<O>>
): AWSHandler {
  return async (awsEvent, _context, callback) => {
    if (!awsEvent) {
      throw new Error("a handler should be called with a valid awsEvent");
    }

    const detail = awsEvent.detail;
    const detailType = awsEvent["detail-type"];

    const incomingEvent = {
      detailType,
      detail,
    } as unknown as I;

    const eventBus = new EventBridgeAdapter<O>({
      handler_name: HANDLER_NAME,
      event_bus_name: EVENT_BUS_NAME,
    });

    const event = await handler(incomingEvent, { eventBus });
    const reply = await eventBus.put(event);
    callback(null, reply);
  };
}

export { serviceHandlerWrapper };
