import {
  SlackOAuthQueryString,
  SlackOAuthData,
  PlatformType,
  LefthoekEventType,
} from "./types";
import AuthLookup from "./authLookup";
import eventBus from "./eventBus";
import fetch from "node-fetch";

export const slack = async (event: SlackOAuthQueryString) => {
  const {
    SLACK_CLIENT_SECRET,
    AUTH_LOOKUP_TABLE: table_name,
    SLACK_CLIENT_ID,
  } = process.env;

  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  const oauthURL = `${baseURL}?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`;
  const response = await fetch(oauthURL);
  const { access_token, ...slackData }: SlackOAuthData = await response.json();
  const { team } = slackData;
  const authLookup = new AuthLookup({ table_name });
  const platform_type = PlatformType.SLACK;
  const detail = await authLookup.write({
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
