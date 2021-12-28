<script lang="ts">
  export let team_id: string;
  import { operationStore, mutation } from "@urql/svelte";
  import Button from "./Button/index.svelte";

  const updateCount = operationStore(`
    mutation {
      increase
    }
  `);

  const updateCountMutation = mutation(updateCount);
  const increaseValue = updateCountMutation;
</script>

<h1 class="text-8xl font-serif mb-8 text-skin-base dark:text-skin-inverted">
  {team_id}
</h1>
<div class="grid grid-cols-3">
  {#if $updateCount.data}
    <Button disabled on:click={increaseValue}>initialize</Button>
    <Button on:click={increaseValue}>increase</Button>
    <p class="mx-12 font-mono font-semibold text-4xl text-skin-primary">
      {$updateCount.data.increase}
    </p>
  {:else}
    <Button on:click={increaseValue}>initialize</Button>
    <Button disabled on:click={increaseValue}>increase</Button>
  {/if}
</div>
