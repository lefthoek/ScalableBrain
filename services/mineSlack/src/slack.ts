import { App } from "@slack/bolt";
import { SlackChannelData } from "./types";

class Slack {
  app: InstanceType<typeof App>;

  constructor({
    access_token,
    signing_secret,
  }: {
    access_token: string;
    signing_secret?: string;
  }) {
    if (!signing_secret) {
      throw new Error("slack signing secret must be set in your environment");
    }
    this.app = new App({ token: access_token, signingSecret: signing_secret });
  }

  async getChannels() {
    const data = await this.app.client.conversations.list();
    if (!data || !data.channels) {
      throw new Error("no channels");
    }
    const channels = data.channels.filter(({ id, is_archived }) => {
      return !is_archived && id;
    });

    return channels as SlackChannelData[];
  }

  async joinChannel({ channel }: { channel: SlackChannelData }) {
    try {
      const res = await this.app.client.conversations.join({
        channel: channel.id,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async joinChannels({ channels }: { channels: SlackChannelData[] }) {
    for (const channel of channels) {
      await this.joinChannel({ channel });
    }
    return channels;
  }

  async getChannelMessages({
    channel_id,
    cursor,
    limit = 100,
    latest_chunk,
  }: {
    channel_id: string;
    cursor?: string;
    limit?: number;
    latest_chunk?: string;
  }) {
    try {
      return await this.app.client.conversations.history({
        channel: channel_id,
        oldest: latest_chunk,
        limit,
        inclusive: false,
        cursor,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async *update({
    channel_id,
    cursor,
    first_page,
    latest_chunk,
  }: {
    channel_id: string;
    cursor?: string;
    first_page?: boolean;
    latest_chunk?: string;
  }): AsyncGenerator<Record<string, any>, void, undefined> {
    const response = await this.getChannelMessages({
      channel_id,
      limit: first_page && latest_chunk ? 101 : 100,
      latest_chunk,
      cursor,
    });

    if (!response || !response.messages) {
      return;
    }

    const { messages, has_more, response_metadata, ...rest } = response;

    if (!latest_chunk) {
      const iterator = messages;
      yield* iterator;
    } else {
      let results = first_page ? messages.slice(0, -1) : messages;
      yield* [...results, { type: "CLUSTER BREAK" }];
    }

    if (!response_metadata || !response_metadata.next_cursor) {
      return;
    }

    if (has_more) {
      yield* await this.update({
        channel_id,
        latest_chunk,
        first_page: false,
        cursor: response_metadata.next_cursor,
      });
    } else {
      console.log("DONE");
      return;
    }
  }
}

export default Slack;
