import type { Team, Store } from "@lefthoek/types";
import { PlatformType } from "@lefthoek/types";

class TeamStore implements Store<Team> {
  async fetch() {
    return {
      name: "Leftcourse",
      id: "T01K2MPN0JU",
      providers: [
        {
          type: PlatformType.Slack,
          name: "Leftcourse",
          id: "T01K2MPN0JU",
          access_token: "",
        },
      ],
    };
  }
}

export { TeamStore };
