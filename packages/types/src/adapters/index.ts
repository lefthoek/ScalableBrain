import type { Event } from "../events";
import { Maybe } from "@lefthoek/graphql-schema";

export interface FSAdapter {
  touch: ({ path }: { path: string }) => Promise<string>;
  writeFile: ({ path, data }: { path: string; data?: any }) => Promise<string>;
  deleteFile: ({ path }: { path: string }) => Promise<string>;
  writeJSON: ({ path, data }: { path: string; data: any }) => Promise<string>;
  readJSON: ({ path }: { path: string }) => Promise<any>;
}

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}

export interface Store<T extends { id: string }> {
  init: (data: T) => Promise<T>;
  fetch: (input: Pick<T, "id">) => Promise<Maybe<T>>;
  write: (data: T) => Promise<T>;
}

export type Handler<U, T> = (event: U, services?: T) => Promise<U>;
