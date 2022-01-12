import { ServiceEvent } from "@service_types/events";

const echo = async (event: ServiceEvent) => {
  console.log(event);
  return event;
};

export default echo;
