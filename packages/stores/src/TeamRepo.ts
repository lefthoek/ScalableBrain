import type { Team, Store, FSAdapter } from "@lefthoek/types";

class TeamRepo implements Store<Team> {
  adapter: FSAdapter;
  static createMetaPath = ({ id }: Pick<Team, "id">) => `${id}/meta.json`;

  constructor({ adapter }: { adapter: FSAdapter }) {
    this.adapter = adapter;
  }

  async init(data: Team) {
    try {
      return await this.write(data);
    } catch (e) {
      console.log(e);
      throw new Error("could not initialize team repo");
    }
  }

  async write(team: Team) {
    await this.adapter.touch({ path: `${team.id}/` });
    const team_meta_path = TeamRepo.createMetaPath(team);
    await this.adapter.writeJSON({
      path: team_meta_path,
      data: team,
    });
    return team;
  }

  async fetch({ id }: Pick<Team, "id">) {
    const path = TeamRepo.createMetaPath({ id });
    const team = await this.adapter.readJSON({
      path,
    });
    console.log("T", team);
    return team;
  }
}

export { TeamRepo };
