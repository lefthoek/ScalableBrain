/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { GenericEvent } from "../events";
import { Maybe } from "@lefthoek/graphql-schema";

export interface FSAdapter {
  touch: ({ path }: { path: string }) => Promise<string>;
  writeFile: ({ path, data }: { path: string; data?: any }) => Promise<string>;
  deleteFile: ({ path }: { path: string }) => Promise<string>;
  writeJSON: ({ path, data }: { path: string; data: any }) => Promise<string>;
  readJSON: ({ path }: { path: string }) => Promise<any>;
}

export interface EventBus<E extends GenericEvent> {
  put: (event: E) => Promise<E["detail"]>;
}

export interface Store<T, U extends keyof T> {
  fetch: (input: Pick<T, U>) => Promise<Maybe<T>>;
  write: (data: T) => Promise<T>;
}

export type Services<U extends GenericEvent> = {
  eventBus: EventBus<U>;
};

export type Handler<I extends GenericEvent, O extends GenericEvent, S> = (
  event: I,
  services?: S
) => Promise<O>;
