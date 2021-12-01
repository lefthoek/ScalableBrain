import Slack from "@providers/slack";
import ChannelRepo from "@stores/channelRepo";
import AuthLookup from "@stores/authLookup";
import S3Adapter from "@adapters/s3Adapter";
import { LefthoekEventType } from "@service_types/enums";

import type { ChannelRepoInitiatedEvent } from "@service_types/events";

const {
  DATALAKE_BUCKET: bucket_name,
  SLACK_SIGNING_SECRET: signing_secret,
  AUTH_LOOKUP_TABLE: table_name,
} = process.env;

const mineChannel = async (event: ChannelRepoInitiatedEvent, services: any) => {
  const { team_id, platform_type, channel_id } = event.detail;
  const authLookup = new AuthLookup({ table_name });
  const { access_token } = await authLookup.get({ team_id, platform_type });
  const slack = new Slack({ access_token, signing_secret });
  const adapter = new S3Adapter({ bucket_name });
  const channelRepo = new ChannelRepo({
    platform_type,
    team_id,
    channel_id,
    adapter,
  });

  const { latest_chunk, is_updating } = await channelRepo.init();

  if (is_updating) {
    return await services.eventBus.put({
      detailType: LefthoekEventType.CHANNEL_REPO_ALREADY_UPDATING,
      detail: {},
    });
  }

  const messageIterator = slack.update({ channel_id, latest_chunk });
  const detail = await channelRepo.update({ messageIterator });

  return await services.eventBus.put({
    detailType: LefthoekEventType.CHANNEL_RAW_DATA_UPDATED,
    detail,
  });
};

export default mineChannel;
