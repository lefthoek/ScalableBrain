export * as enums from "./enums";
export * as models from "./models";
export * as events from "./events";

import { EventBridge } from "@lefthoek/adapters";
import { Event } from "@lefthoek/types";
export type Services<U extends Event<string, unknown>> = {
  eventBus: EventBridge<U>;
};
