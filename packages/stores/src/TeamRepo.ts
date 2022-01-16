import type { Team, Store, FSAdapter } from "@lefthoek/types";

class TeamRepo implements Store<Team, "id"> {
  adapter: FSAdapter;
  static createMetaPath = ({ id }: Pick<Team, "id">) => `${id}/meta.json`;

  constructor({ adapter }: { adapter: FSAdapter }) {
    this.adapter = adapter;
  }

  async write(team: Team) {
    try {
      await this.adapter.touch({ path: `${team.id}/` });
      const team_meta_path = TeamRepo.createMetaPath(team);
      await this.adapter.writeJSON({
        path: team_meta_path,
        data: team,
      });
      return team;
    } catch (e) {
      throw new Error("could not write team repo");
    }
  }

  async fetch({ id }: Pick<Team, "id">) {
    const path = TeamRepo.createMetaPath({ id });
    const team = await this.adapter.readJSON({
      path,
    });
    return team;
  }
}

export { TeamRepo };
