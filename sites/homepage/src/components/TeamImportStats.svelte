<script lang="ts">
  export let team_id: string;
  import { operationStore, query } from "@urql/svelte";

  const teamData = operationStore(`
    query {
      team {
        id
        name
      }
    }
  `);

  query(teamData);
</script>

<h1 class="text-8xl font-serif mb-8 text-skin-base dark:text-skin-inverted">
  {#if $teamData.data}
    {$teamData.data.team.name}
  {:else}
    {team_id}
  {/if}
</h1>
