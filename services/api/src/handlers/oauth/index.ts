import fetch from "node-fetch";
import { EventBridge } from "@lefthoek/adapters";
import { AuthLookup } from "@lefthoek/stores";
import { ProviderType, LefthoekEventType } from "@lefthoek/types";
import type { SlackOAuthData } from "@lefthoek/types";
import type { SlackOAuthQueryString } from "./types";
import { v4 as uuid } from "uuid";

const {
  SLACK_CLIENT_SECRET: client_secret,
  SLACK_CLIENT_ID: client_id,
  AUTH_LOOKUP_TABLE: table_name,
  HANDLER_NAME: handler_name,
  EVENT_BUS_NAME: event_bus_name,
} = process.env;

export const slack = async (event: SlackOAuthQueryString) => {
  const eventBus = new EventBridge({ handler_name, event_bus_name });
  const authLookup = new AuthLookup({ table_name });
  const baseURL = "https://slack.com/api/oauth.v2.access";
  const params = new URLSearchParams({ team_id: id });
  const location = `https://zwarmer.com/teams/?${params.toString()}`;
  const oauthURL = `${baseURL}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  const { code } = event.queryStringParameters;
  const id = uuid();

  try {
    const response = await fetch(oauthURL);
    const { access_token, team } = (await response.json()) as SlackOAuthData;
    const { name, id: provider_id } = team;
    const provider_type = ProviderType.Slack;

    await authLookup.write({
      provider_id,
      team_id: id,
      name,
      provider_type,
      access_token,
    });

    await eventBus.put({
      detailType: LefthoekEventType.TEAM_ADDED,
      detail: {
        id,
        name: team.name,
        providers: [{ type: provider_type, id: provider_id, name }],
      },
    });

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
