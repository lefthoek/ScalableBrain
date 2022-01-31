import type { AWS } from "@serverless/typescript";
import { incomingEventTypes } from "../src/functions/initTeam";

const functions: AWS["functions"] = {
  initTeam: {
    handler: "src/index.initTeam",
    events: [
      {
        eventBridge: {
          eventBus: "${self:custom.event_bus}",
          pattern: {
            "detail-type": incomingEventTypes,
          },
        },
      },
    ],
    environment: {
      KNOWLEDGE_BASE_BUCKET: "${self:custom.knowledge_base_bucket}",
      AUTH_LOOKUP_TABLE: "${self:custom.auth_lookup_table}",
      HANDLER_NAME: "${self:custom.init_team}",
      EVENT_BUS_NAME: "${self:custom.event_bus}",
    },
  },
};

export default functions;
