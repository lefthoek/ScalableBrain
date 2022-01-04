import { Handler as AWSHandler } from "aws-lambda";
import { EventBridge } from "@lefthoek/adapters";
import type { Handler } from "@lefthoek/types";
import type { ServiceEvent } from "@service_types/events";

export type Services = { eventBus: EventBridge<ServiceEvent> };
const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

const wrapper: (handler: Handler<any, Services>) => AWSHandler = (handler) => {
  return async (awsEvent, _context, callback) => {
    const detail = awsEvent.detail;
    const detailType = awsEvent["detail-type"];

    const eventBus = new EventBridge<ServiceEvent>({
      handler_name: HANDLER_NAME,
      event_bus_name: EVENT_BUS_NAME,
    });

    const event = await handler(
      {
        detailType,
        detail,
      },
      { eventBus }
    );
    if (event) {
      const reply = await eventBus.put(event);
      callback(null, reply);
    } else {
      callback(null, "nothing memorable happened");
    }
  };
};

const wrapServices: (
  serviceMap: Record<string, Handler<any, Services>>
) => Record<string, AWSHandler> = (serviceMap) => {
  let entries = Object.entries(serviceMap);
  let wrappedEntries = entries.map(([key, handler]) => [key, wrapper(handler)]);
  return Object.fromEntries(wrappedEntries);
};

export { wrapServices };
