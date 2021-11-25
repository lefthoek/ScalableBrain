import type { PlatformType } from "./types/enums";
import type { SlackOAuthData } from "./types/models";
import type { FSAdapter } from "./types/adapters";

class TeamRepo {
  team_id: string;
  adapter: FSAdapter;
  platform_type: PlatformType;
  team_meta_path: string;

  constructor({
    adapter,
    team_id,
    platform_type,
  }: {
    team_id: string;
    platform_type: PlatformType;
    adapter: FSAdapter;
  }) {
    this.adapter = adapter;
    this.team_id = team_id;
    this.platform_type = platform_type;
    this.team_meta_path = `${this.team_id}/meta.json`;
  }

  async init(data: SlackOAuthData) {
    try {
      return await this.writeMetaData(data);
    } catch (e) {
      console.log(e);
      throw new Error("could not initialize team repo");
    }
  }

  async writeMetaData(data: SlackOAuthData) {
    await this.adapter.touch({ path: `${this.team_id}/` });
    await this.adapter.writeJSON({
      path: this.team_meta_path,
      data,
    });

    return {
      team_id: this.team_id,
      platform_type: this.platform_type,
    };
  }

  async getMetaData() {
    const { team_id, platform_type } = this;
    const data = (await this.adapter.readJSON({
      path: this.team_meta_path,
    })) as SlackOAuthData;

    return { team_id, platform_type, ...data };
  }
}

export default TeamRepo;
