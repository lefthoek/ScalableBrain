import type { Team, Store } from "@lefthoek/types";
import { PlatformType } from "@lefthoek/types";

class TeamStore implements Store<Team> {
  async fetch() {
    return {
      name: "Lefthoek",
      team_id: "T01K2MPN0JU",
      providers: [
        {
          platform_type: PlatformType.Slack,
          name: "Lefthoek",
          provider_id: "T01K2MPN0JU",
          access_token: "fsfsdalkadf",
        },
      ],
    };
  }
}

export { TeamStore };
