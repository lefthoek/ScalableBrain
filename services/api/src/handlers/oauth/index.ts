import fetch from "node-fetch";
import { EventBridge } from "@lefthoek/adapters";
import { PlatformType, LefthoekEventType } from "@lefthoek/types";
import type { SlackOAuthData } from "@lefthoek/types";
import type { SlackOAuthQueryString } from "./types";
import { v4 as uuid } from "uuid";

const {
  SLACK_CLIENT_SECRET: client_secret,
  SLACK_CLIENT_ID: client_id,
  HANDLER_NAME: handler_name,
  EVENT_BUS_NAME: event_bus_name,
} = process.env;

export const slack = async (event: SlackOAuthQueryString) => {
  const eventBus = new EventBridge({ handler_name, event_bus_name });
  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  try {
    const oauthURL = `${baseURL}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    const response = await fetch(oauthURL);
    const { access_token, team } = (await response.json()) as SlackOAuthData;

    const detail = {
      name: team.name,
      team_id: uuid(),
      providers: [
        {
          type: PlatformType.Slack,
          access_token,
          provider_id: team.id,
          name: team.name,
        },
      ],
    };

    await eventBus.put({
      detailType: LefthoekEventType.TEAM_ADDED,
      detail,
    });

    const params = new URLSearchParams({ team_id: team.id });
    const location = `https://zwarmer.com/teams/?${params.toString()}`;

    return {
      statusCode: 301,
      headers: {
        Location: location,
        path: `/teams/?${params.toString()}`,
      },
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(error, null, 2),
    };
  }
};

export default slack;
