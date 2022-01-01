import { subscriptionServer } from "./websockets";

export const bridge = (event: any) => {
  console.log(event);
  return subscriptionServer.publish({
    topic: event["detail-type"],
    payload: event.detail.team,
  });
};
