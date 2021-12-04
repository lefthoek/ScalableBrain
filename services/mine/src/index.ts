import { slack } from "./handlers";
import { wrapServices } from "@adapters/handler";
import * as functions from "./functions";

const { initTeam, initChannels, mineChannel, echo } = wrapServices(functions);

export { slack, initTeam, initChannels, mineChannel, echo };
