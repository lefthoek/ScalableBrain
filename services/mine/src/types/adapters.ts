import { Event, LefthoekEvent } from "./events";

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

export type LefthoekEventBus = EventBus<LefthoekEvent>;
