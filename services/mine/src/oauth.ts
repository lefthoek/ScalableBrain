import fetch from "node-fetch";
import AuthLookup from "./authLookup";
import eventBus from "./eventBus";
import { PlatformType, LefthoekEventType } from "./types/enums";

import type { SlackOAuthQueryString, SlackOAuthData } from "./types/models";

const {
  SLACK_CLIENT_SECRET,
  AUTH_LOOKUP_TABLE: table_name,
  SLACK_CLIENT_ID,
} = process.env;

export const slack = async (event: SlackOAuthQueryString) => {
  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  const oauthURL = `${baseURL}?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`;
  const response = await fetch(oauthURL);
  const { access_token, ...slackData } =
    (await response.json()) as SlackOAuthData;
  const { team } = slackData;
  const authLookup = new AuthLookup({ table_name });
  const platform_type = PlatformType.SLACK;

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

  return {
    statusCode: 200,
    body: JSON.stringify(reply, null, 2),
  };
};

export default slack;
