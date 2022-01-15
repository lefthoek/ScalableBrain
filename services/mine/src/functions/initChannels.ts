import { S3Adapter, DynamoDBAdapter } from "@lefthoek/adapters";
import { AuthLookup } from "@lefthoek/stores";
/**
import ChannelRepo from "@stores/channelRepo";
import Slack from "@providers/slack";
import { ServiceEventType } from "@service_types/enums";

*/
import type { TeamRepoInitiatedEvent } from "@service_types/events";

const {
  RAW_DATA_BUCKET: bucket_name,
  SLACK_SIGNING_SECRET: signing_secret,
  AUTH_LOOKUP_TABLE: table_name,
} = process.env;

const initChannels = async (event: TeamRepoInitiatedEvent) => {
  const repoAdapter = new S3Adapter({ bucket_name });
  const authAdapter = new DynamoDBAdapter({ table_name });
  const authLookup = new AuthLookup({ adapter: authAdapter });
  console.log(event);
  console.log(repoAdapter, signing_secret, authLookup);
  return null;
  /**
  const { team_id, platform_type } = event.detail;

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
    await services.eventBus.put({
      detailType: CHANNEL_REPO_INITIATED,
      detail,
    });
  }

  return await services.eventBus.put({
    detailType: CHANNEL_REPOS_INITIATED,
    detail: { team_id, channels: joined_channels },
  });
  */
};

export default initChannels;
