import fetch from "node-fetch";
import { EventBus } from "@lefthoek/adapters";
import { PlatformType, LefthoekEventType } from "@lefthoek/types/dist/enums";
import type { SlackOAuthData } from "@lefthoek/types/dist/models";
import type { SlackOAuthQueryString } from "./types";

const {
  SLACK_CLIENT_SECRET: client_secret,
  SLACK_CLIENT_ID: client_id,
  HANDLER_NAME: handler_name,
  EVENT_BUS_NAME: event_bus_name,
} = process.env;

export const slack = async (event: SlackOAuthQueryString) => {
  const eventBus = new EventBus({ handler_name, event_bus_name });
  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  const oauthURL = `${baseURL}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  const response = await fetch(oauthURL);
  const { access_token, ...slackData } =
    (await response.json()) as SlackOAuthData;
  const { team } = slackData;
  const platform_type = PlatformType.SLACK;

  if (!access_token) {
    return {
      statusCode: 200,
      body: JSON.stringify({ access_token, ...slackData }, null, 2),
    };
  }

  await eventBus.put({
    detailType: LefthoekEventType.TEAM_ADDED,
    detail: { ...slackData, platform_type },
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
};

export default slack;
