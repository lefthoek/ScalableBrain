import { LefthoekEvent } from "@lefthoek/types/dist/events";
import { Handler as AWSHandler } from "aws-lambda";
import { subscriptionServer } from "./websockets";

const wrapper: (handler: any) => AWSHandler = (handler) => {
  return async (awsEvent, _context) => {
    const detail = awsEvent.detail;
    const detailType = awsEvent["detail-type"];
    await handler({
      detail,
      detailType,
    });
  };
};

const _bridge = (event: LefthoekEvent) => {
  console.log(event);
  return subscriptionServer.publish({
    topic: event.detailType,
    payload: event.detail.team,
  });
};

export const bridge = wrapper(_bridge);
