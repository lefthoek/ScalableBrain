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

<h1 class="team_id">Team ID: {team_id}</h1>

{#if $updateCount.data}
  <Button on:click={increaseValue}>{$updateCount.data.increase}</Button>
{:else}
  <Button on:click={increaseValue}>Initialize Value</Button>
{/if}

<style lang="postcss">
  .team_id {
    @apply text-8xl;
  }
</style>
