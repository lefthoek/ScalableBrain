import type { SlackChannelData } from "@service_types/models";
import type { ProviderType, FSAdapter } from "@lefthoek/types";

class ChannelRepo {
  buffer: Record<string, any>[];
  provider_id: string;
  channel_id: string;
  provider_type: ProviderType;
  adapter: FSAdapter;
  path: string;
  cluster_length: number;
  is_updating?: boolean;
  chunks: string[];

  constructor({
    adapter,
    provider_id,
    provider_type,
    channel_id,
    is_updating,
    cluster_length = 100,
  }: {
    adapter: FSAdapter;
    provider_id: string;
    provider_type: ProviderType;
    is_updating?: boolean;
    cluster_length?: number;
    channel_id: string;
  }) {
    this.chunks = [];
    this.adapter = adapter;
    this.cluster_length = cluster_length;
    this.channel_id = channel_id;
    this.provider_type = provider_type;
    this.provider_id = provider_id;
    this.is_updating = is_updating;
    this.path = `${this.provider_id}/${this.channel_id}`;
    this.buffer = [];
  }

  async init(data?: SlackChannelData) {
    try {
      if (data) {
        await this.adapter.writeJSON({
          path: `${this.path}/provider.json`,
          data,
        });
      }
      const { is_updating } = await this.dehydrateState();
      if (!is_updating) {
        await this.deleteLatestIncompleteChunk();
      }
      return await this.getMetaData();
    } catch (e) {
      throw new Error(`could not initialize channel repo ${this.channel_id}`);
    }
  }

  async deleteLatestIncompleteChunk() {
    try {
      const [latest_chunk, ...other_chunks] = this.chunks;
      const path = `${this.path}/${latest_chunk}.json`;
      const records = await this.adapter.readJSON({ path });
      if (records.length < this.cluster_length) {
        console.log(`deleted last incomplete cluster ${path}`, records.length);
        await this.adapter.deleteFile({ path });
        this.chunks = other_chunks;
        return await this.writeMetaData();
      }
    } catch {
      return await this.getMetaData();
    }
  }

  async dehydrateState() {
    try {
      const { chunks, is_updating } = await this.adapter.readJSON({
        path: `${this.path}/meta.json`,
      });
      this.chunks = chunks;
      this.is_updating = is_updating;
      return await this.getMetaData();
    } catch (e) {
      console.log(e);
      return await this.writeMetaData();
    }
  }

  async writeMetaData() {
    const { provider_type, provider_id, channel_id, chunks, is_updating } =
      this;
    const data = {
      provider_id,
      provider_type,
      is_updating,
      channel_id,
      chunks,
    };
    await this.adapter.writeJSON({ path: `${this.path}/meta.json`, data });
    return data;
  }

  async dump() {
    if (!this.buffer || this.buffer.length < 1) {
      console.log("no more messages to save");
      return this.getMetaData();
    }
    const chunk = this.buffer[0] && this.buffer[0].ts;
    const path = `${this.path}/${chunk}.json`;
    await this.adapter.writeJSON({ path, data: this.buffer });
    this.buffer = [];
    const newChunks = [chunk, ...this.chunks].sort((a, b) => b - a);
    this.chunks = newChunks;
    return await this.writeMetaData();
  }

  async update({
    messageIterator,
  }: {
    messageIterator: AsyncGenerator<Record<string, any>>;
  }) {
    await this.lockChannel();
    for await (const message of messageIterator) {
      this.buffer.push(message);
      if (
        this.buffer.length === this.cluster_length ||
        message.type === "CLUSTER BREAK"
      ) {
        if (message.type === "CLUSTER BREAK") {
          this.buffer.pop();
        }
        await this.dump();
      }
    }
    await this.dump();
    return await this.unlockChannel();
  }

  async lockChannel() {
    this.is_updating = true;
    return this.writeMetaData();
  }

  async unlockChannel() {
    this.is_updating = false;
    return this.writeMetaData();
  }

  async getMetaData() {
    const { provider_type, provider_id, channel_id, chunks, is_updating } =
      this;
    const latest_chunk = chunks[0];
    return {
      provider_type,
      provider_id,
      channel_id,
      latest_chunk,
      is_updating,
    };
  }
}

export default ChannelRepo;
