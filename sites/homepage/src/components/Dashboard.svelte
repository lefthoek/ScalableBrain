<script lang="ts">
  import TeamImportStats from "./TeamImportStats.svelte";
  const params = new URLSearchParams(window.location.search);
  const team_id = params.get("team_id");

  import { createClient, setClient } from "@urql/svelte";

  const client = createClient({
    url: "https://bdaey0v9lf.execute-api.eu-west-1.amazonaws.com/dev/graphql",
  });

  setClient(client);
</script>

<TeamImportStats {team_id} />
