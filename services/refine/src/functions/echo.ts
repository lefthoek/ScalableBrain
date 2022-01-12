import { LefthoekEvent } from "@lefthoek/types";

const echo = async (event: LefthoekEvent) => {
  console.log(event);
  return event;
};

export default echo;
