<script lang="ts">
  import TeamImportStats from "./TeamImportStats.svelte";
  const params = new URLSearchParams(window.location.search);
  const team_id = params.get("team_id");

  import { createClient, setClient } from "@urql/svelte";

  const client = createClient({
    url: "https://bdaey0v9lf.execute-api.eu-west-1.amazonaws.com/dev/graphql",
    fetchOptions: () => {
      return {};
    },
  });

  console.log(client);
  setClient(client);
</script>

<div class="widget">
  <TeamImportStats {team_id} />
</div>

<style lang="postcss">
  .widget {
    @apply p-8 bg-neutral-900 text-gray-100;
  }
</style>
