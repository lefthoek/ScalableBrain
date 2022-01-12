export * as enums from "./enums";
export * as models from "./models";
export * as events from "./events";

import { EventBridge } from "@lefthoek/adapters";
import type { ServiceEvent } from "./events";
export type Services = { eventBus: EventBridge<ServiceEvent> };
