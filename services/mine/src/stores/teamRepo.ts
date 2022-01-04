import type { Team, FSAdapter } from "@lefthoek/types";

class TeamRepo {
  team_id: string;
  adapter: FSAdapter;
  team_meta_path: string;

  constructor({ adapter, team }: { team: Team; adapter: FSAdapter }) {
    this.adapter = adapter;
    this.team_id = team.team_id;
    this.team_meta_path = `${this.team_id}/meta.json`;
  }

  async init(data: Team) {
    try {
      return await this.writeMetaData(data);
    } catch (e) {
      console.log(e);
      throw new Error("could not initialize team repo");
    }
  }

  async writeMetaData(data: Team) {
    await this.adapter.touch({ path: `${this.team_id}/` });
    await this.adapter.writeJSON({
      path: this.team_meta_path,
      data,
    });
    return data;
  }

  async getMetaData() {
    return (await this.adapter.readJSON({
      path: this.team_meta_path,
    })) as Team;
  }
}

export default TeamRepo;
