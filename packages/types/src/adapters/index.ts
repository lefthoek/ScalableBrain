import { Event, LefthoekEvent } from "../events";
import { Maybe } from "@lefthoek/graphql-schema";

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}

export interface Store<T> {
  fetch: () => Promise<Maybe<T>>;
}

export type LefthoekEventBus = EventBus<LefthoekEvent>;
