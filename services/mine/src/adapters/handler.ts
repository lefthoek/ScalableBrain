import EventBus from "./eventBus";
import { Handler as AWSHandler } from "aws-lambda";
import type { LefthoekEventBus } from "@service_types/adapters";
import type { LefthoekEvent } from "@service_types/events";

type Services = { eventBus: LefthoekEventBus };
type Handler<U> = (event: LefthoekEvent, services?: Services) => Promise<U>;

const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

const newHandler: (handler: Handler<any>) => AWSHandler = (handler) => {
  return async (awsEvent, _context, callback) => {
    const detail = awsEvent.detail;
    const detailType = awsEvent["detail-type"];

    const eventBus = new EventBus({
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
  serviceMap: Record<string, Handler<any>>
) => Record<string, AWSHandler> = (serviceMap) => {
  let entries = Object.entries(serviceMap);
  let wrappedEntries = entries.map(([key, handler]) => [
    key,
    newHandler(handler),
  ]);
  return Object.fromEntries(wrappedEntries);
};

export { wrapServices };
