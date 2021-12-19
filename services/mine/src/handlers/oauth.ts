import fetch from "node-fetch";
import AuthLookup from "@stores/authLookup";
import EventBus from "@adapters/eventBus";
import { PlatformType, LefthoekEventType } from "@service_types/enums";

import type {
  SlackOAuthQueryString,
  SlackOAuthData,
} from "@service_types/models";

const {
  SLACK_CLIENT_SECRET,
  AUTH_LOOKUP_TABLE: table_name,
  SLACK_CLIENT_ID,
} = process.env;

const { HANDLER_NAME, EVENT_BUS_NAME } = process.env;

export const slack = async (event: SlackOAuthQueryString) => {
  const eventBus = new EventBus({
    handler_name: HANDLER_NAME,
    event_bus_name: EVENT_BUS_NAME,
  });
  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  const oauthURL = `${baseURL}?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`;
  const response = await fetch(oauthURL);
  const { access_token, ...slackData } =
    (await response.json()) as SlackOAuthData;
  const { team } = slackData;
  const authLookup = new AuthLookup({ table_name });
  const platform_type = PlatformType.SLACK;

  if (!access_token) {
    return {
      statusCode: 200,
      body: JSON.stringify({ access_token, ...slackData }, null, 2),
    };
  }

  await authLookup.write({
    team_id: team.id,
    team_name: team.name,
    platform_type,
    access_token,
  });

  const reply = await eventBus.put({
    detailType: LefthoekEventType.TEAM_ADDED,
    detail: { ...slackData, platform_type },
  });

  const params = new URLSearchParams({ team_id: slackData.team.id });
  const location = `https://zwarmer.com/teams?${params.toString()}`;
  console.log(reply);
  console.log(location);

  return {
    statusCode: 301,
    headers: {
      Location: location,
      path: `?${params.toString()}`,
    },
  };
};

export default slack;
