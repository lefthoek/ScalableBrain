<script lang="ts">
  export let type = "button";
  export let href = "";
  export let target = "__blank";
</script>

{#if href}
  <a {target} class="button" {href}><slot /></a>
{:else}
  <button on:click class="button" {type}>
    <slot />
  </button>
{/if}

<style lang="postcss">
  .button {
    @apply py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md;
  }
  .button:hover {
    @apply bg-purple-700;
  }
  .button:focus {
    @apply outline-none ring-2 ring-purple-400 ring-opacity-75;
  }
</style>
