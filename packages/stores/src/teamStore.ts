import type { Team, Store } from "@lefthoek/types";
import { ProviderType } from "@lefthoek/types";

class TeamStore implements Store<Team> {
  async fetch() {
    return {
      name: "Lefthoek",
      id: "T01K2MPN0JU",
      providers: [
        {
          type: ProviderType.Slack,
          name: "Lefthoek",
          id: "T01K2MPN0JU",
          access_token: "fsfsdalkadf",
        },
      ],
    };
  }
}

export { TeamStore };
