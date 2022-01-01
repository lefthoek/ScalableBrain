import { Event, LefthoekEvent } from "../events";

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}

export type LefthoekEventBus = EventBus<LefthoekEvent>;
