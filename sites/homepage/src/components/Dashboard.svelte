<script lang="ts">
  import GraphQL from "./GraphQL.svelte";
  import TeamImportStats from "./TeamImportStats.svelte";
  const params = new URLSearchParams(window.location.search);
  const team_id = params.get("team_id");
</script>

<GraphQL>
  <TeamImportStats {team_id} />
</GraphQL>
