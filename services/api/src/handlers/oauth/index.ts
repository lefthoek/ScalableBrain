import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { EventBridge } from "@lefthoek/adapters";
import { AuthLookup } from "@lefthoek/stores";
import { ProviderType, LefthoekEventType } from "@lefthoek/types";
import type { SlackOAuthData } from "@lefthoek/types";
import type { SlackOAuthQueryString } from "./types";
import { v4 as uuid } from "uuid";

const { TEAM_AUTHENTICATED } = LefthoekEventType;

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

  try {
    const baseURL = "https://slack.com/api/oauth.v2.access";
    const { code } = event.queryStringParameters;
    const oauthURL = `${baseURL}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;

    const response = await fetch(oauthURL);

    const { access_token, team } = (await response.json()) as SlackOAuthData;
    const { name, id: provider_id } = team;
    const provider_type = ProviderType.Slack;

    const authData = await authLookup.get({ provider_id, provider_type });
    const id = authData?.team_id || uuid();

    await authLookup.write({
      provider_id,
      team_id: id,
      provider_type,
      access_token,
    });

    await eventBus.put({
      detailType: TEAM_AUTHENTICATED,
      detail: {
        id,
        name,
        providers: [{ type: provider_type, id: provider_id, name }],
      },
    });

    const params = new URLSearchParams({ team_id: id });
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
