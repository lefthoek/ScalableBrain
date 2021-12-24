<script lang="ts">
  export let type = "button";
  export let href = "";
  export let target = "__blank";
</script>

{#if href}
  <a {target} class="btn" {href}><slot /></a>
{:else}
  <button on:click class="btn" {type}>
    <slot />
  </button>
{/if}
