<script lang="ts">
  export let team_id: string;
  import Button from "./Button.svelte";
  import { operationStore, query } from "@urql/svelte";
  let value = 123;
  const increaseValue = () => {
    value = value + 1;
  };

  const adder = operationStore(`
    query {
      add(x:2254, y:2)
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
    {$adder.data.add}
    <Button on:click={increaseValue}>{value}</Button>
  </ul>
{/if}

<style lang="postcss">
  .team_id {
    @apply text-8xl;
  }
</style>
