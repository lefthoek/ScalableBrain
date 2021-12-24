<script lang="ts">
  export let team_id: string;
  import Button from "./Button.svelte";
  import { operationStore, mutation } from "@urql/svelte";

  const updateCount = operationStore(`
    mutation {
      increase
    }
  `);

  const updateCountMutation = mutation(updateCount);
  const increaseValue = updateCountMutation;
</script>

<div class="p-8 font-serif bg-skyBlue-100 text-cipria-100 h-full rounded-3xl">
  <h1 class="text-8xl mb-8">Team ID: {team_id}</h1>
  {#if $updateCount.data}
    <Button on:click={increaseValue}>{$updateCount.data.increase}</Button>
  {:else}
    <Button on:click={increaseValue}>Initialize Value</Button>
  {/if}
</div>
