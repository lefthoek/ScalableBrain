import { LefthoekEvent } from "@lefthoek/types/dist/events";
/**
import { subscriptionServer } from "./websockets";
**/

export const bridge = (event: LefthoekEvent) => {
  console.log(event);
  /**
  return subscriptionServer.publish({
    topic: "COUNT_UPDATED",
    payload: {},
  });
  **/
  return event;
};
