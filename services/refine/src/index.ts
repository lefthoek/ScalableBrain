import { wrapServices } from "./adapters/handler";
import * as functions from "./functions";

const { initTeam, initChannels, mineChannel, echo } = wrapServices(functions);

export { initTeam, initChannels, mineChannel, echo };
