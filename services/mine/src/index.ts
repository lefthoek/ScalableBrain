export * from "./handlers";
import { wrapServices } from "@adapters/handler";
import * as functions from "./functions";

export const { initTeam, initChannels, mineChannel, echo } =
  wrapServices(functions);
