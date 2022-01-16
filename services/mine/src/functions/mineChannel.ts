import Slack from "@providers/slack";
import ChannelRepo from "@stores/channelRepo";
import { AuthLookup } from "@lefthoek/stores";
import { S3Adapter, DynamoDBAdapter } from "@lefthoek/adapters";
import { ServiceEventType } from "@service_types/enums";
import { ServiceEvent } from "@service_types/events";
import { Services } from "@lefthoek/types";

import type { ChannelRepoInitiatedEvent } from "@service_types/events";

const {
  DATALAKE_BUCKET: bucket_name,
  SLACK_SIGNING_SECRET: signing_secret,
  AUTH_LOOKUP_TABLE: table_name,
} = process.env;

const mineChannel = async (
  event: ChannelRepoInitiatedEvent,
  services: Services<ServiceEvent>
) => {
  const { provider_id, provider_type, channel_id } = event.detail;
  const authAdapter = new DynamoDBAdapter({ table_name });
  const authLookup = new AuthLookup({ adapter: authAdapter });
  const access_token = await authLookup.getAccessToken({
    provider_id,
    provider_type,
  });
  const slack = new Slack({ access_token, signing_secret });
  const repoAdapter = new S3Adapter({ bucket_name });
  const channelRepo = new ChannelRepo({
    provider_type,
    provider_id,
    channel_id,
    adapter: repoAdapter,
  });

  const { latest_chunk, is_updating } = await channelRepo.init();

  if (is_updating) {
    return await services.eventBus.put({
      detailType: ServiceEventType.CHANNEL_REPO_ALREADY_UPDATING,
      detail: {},
    });
  }

  const messageIterator = slack.update({ channel_id, latest_chunk });
  const detail = await channelRepo.update({ messageIterator });

  return {
    detailType: ServiceEventType.CHANNEL_RAW_DATA_UPDATED,
    detail,
  };
};

export default mineChannel;
