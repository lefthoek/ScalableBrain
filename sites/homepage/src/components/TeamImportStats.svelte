<script lang="ts">
  export let team_id: string;
  import { operationStore, mutation } from "@urql/svelte";
  const disabled = true;

  const updateCount = operationStore(`
    mutation {
      increase
    }
  `);

  const updateCountMutation = mutation(updateCount);
  const increaseValue = updateCountMutation;
</script>

<h1 class="text-8xl font-serif mb-8 text-brightGreen-100">
  Team ID: {team_id}
</h1>
{#if $updateCount.data}
  <button class="btn btn-primary" on:click={increaseValue}
    >{$updateCount.data.increase}</button
  >
{:else}
  <button class="btn btn-primary" on:click={increaseValue}
    >Initialize Value</button
  >
{/if}
<button class="btn btn-primary" disabled>DISABLED</button>
