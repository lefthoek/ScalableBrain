<script lang="ts">
  export let team_id: string;
  import { operationStore, query } from "@urql/svelte";

  const adder = operationStore(`
    query {
      add(x:2, y:2)
    }
  `);

  query(adder);
</script>

<h1 class="team_id">Team ID: {team_id}</h1>
{#if $adder.fetching}
  <p>Loading...</p>
{:else if $adder.error}
  <p>Oh no... {$adder.error.message}</p>
{:else}
  <ul>
    {#each $adder.data.add as add}
      <li>{add}</li>
    {/each}
  </ul>
{/if}

<style lang="postcss">
  .team_id {
    @apply text-8xl;
  }
</style>
