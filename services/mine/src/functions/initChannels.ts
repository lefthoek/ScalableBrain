/**
import ChannelRepo from "@stores/channelRepo";
import AuthLookup from "@stores/authLookup";
import Slack from "@providers/slack";
import { S3Adapter } from "@lefthoek/adapters";
import { ServiceEventType } from "@service_types/enums";

*/
import type { TeamRepoInitiatedEvent } from "@service_types/events";

/**
const {
  DATALAKE_BUCKET: bucket_name,
  SLACK_SIGNING_SECRET: signing_secret,
  AUTH_LOOKUP_TABLE: table_name,
} = process.env;
const { CHANNEL_REPO_INITIATED, CHANNEL_REPOS_INITIATED } = ServiceEventType;
*/

const initChannels = async (event: TeamRepoInitiatedEvent, services: any) => {
  console.log(event, services);
  /**
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
