import { Handler as AWSHandler } from "aws-lambda";
import { EventBridgeAdapter } from "@lefthoek/adapters";
import type { Handler, Services } from "@lefthoek/types";
import type { GenericEvent } from "@lefthoek/types";

const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

function serviceHandlerWrapper<I extends GenericEvent, O extends GenericEvent>(
  handler: Handler<I, O, Services<O>>
): AWSHandler {
  return async (awsEvent, _context, callback) => {
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
    if (event) {
      const reply = await eventBus.put(event);
      callback(null, reply);
    } else {
      callback(null, "nothing memorable happened");
    }
  };
}

export { serviceHandlerWrapper };
