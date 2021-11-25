import ChannelRepo from "./channelRepo";
import AuthLookup from "./authLookup";
import Slack from "./slack";
import S3Adapter from "./s3Adapter";
import eventBus from "./eventBus";
import { LefthoekEventType } from "./types/enums";

import type { TeamRepoInitiatedEvent } from "./types/events";

const initChannels = async (event: TeamRepoInitiatedEvent) => {
  const {
    DATALAKE_BUCKET: bucket_name,
    SLACK_SIGNING_SECRET: signing_secret,
    AUTH_LOOKUP_TABLE: table_name,
  } = process.env;
  const { team_id, platform_type } = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const authLookup = new AuthLookup({ table_name });
  const { access_token } = await authLookup.get({ team_id, platform_type });

  const slack = new Slack({
    access_token,
    signing_secret,
  });

  const raw_channels = await slack.getChannels();
  const joined_channels = await slack.joinChannels({
    channels: raw_channels,
  });

  for (const channel of joined_channels) {
    const channelRepo = new ChannelRepo({
      platform_type,
      team_id,
      channel_id: channel.id,
      adapter,
    });
    const detail = await channelRepo.init(channel);
    await eventBus.put({
      detailType: LefthoekEventType.CHANNEL_REPO_INITIATED,
      detail,
    });
  }

  return await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED,
    detail: { team_id, channels: joined_channels },
  });
};

export default initChannels;
