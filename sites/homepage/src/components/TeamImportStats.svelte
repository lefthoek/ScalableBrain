<script lang="typescript">
  const type = "button";
  const params = new URLSearchParams(window.location.search);
  const team_id = params.get("team_id");

  import { createClient, setClient } from "@urql/svelte";

  const client = createClient({
    url: "https://bdaey0v9lf.execute-api.eu-west-1.amazonaws.com/dev/graphql",
  });

  setClient(client);
</script>

<div class="widget" {type}>
  <h1 class="team_id">Team ID: {team_id}</h1>
</div>

<style lang="postcss">
  .team_id {
    @apply text-8xl;
  }
  .widget {
    @apply p-8 bg-neutral-900 text-gray-100;
  }
</style>
