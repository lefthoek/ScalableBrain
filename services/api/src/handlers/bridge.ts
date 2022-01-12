import { Handler as AWSHandler } from "aws-lambda";
import { subscriptionServer } from "./websockets";

import type { LefthoekEvent } from "@lefthoek/types";

type Handler<U> = (event: U) => Promise<void>;

const wrapper: (handler: Handler<LefthoekEvent>) => AWSHandler = (handler) => {
  return async (awsEvent) => {
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
    topic: "EVENT_OCCURRED",
    payload: event,
  });
};

export const bridge = wrapper(_bridge);
