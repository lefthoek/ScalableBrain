import { Handler as AWSHandler } from "aws-lambda";
import { subscriptionServer } from "./websockets";

import type { LefthoekEvent } from "@lefthoek/types";

type Handler<U> = (event: U, context?: any) => Promise<void>;

const wrapper: (handler: Handler<LefthoekEvent>) => AWSHandler = (handler) => {
  return async (awsEvent, _context) => {
    const detail = awsEvent.detail;
    const detailType = awsEvent["detail-type"];
    await handler({
      detail,
      detailType,
    });
  };
};

const _bridge = async (event: LefthoekEvent) => {
  return subscriptionServer.publish({
    topic: event.detailType,
    payload: event.detail,
  });
};

export const bridge = wrapper(_bridge);
