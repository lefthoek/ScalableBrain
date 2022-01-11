<script lang="ts">
  export let href = "";
  export let disabled = false;
</script>

{#if href}
  <a class={$$restProps.class} {href}><slot /></a>
{:else}
  <button {disabled} class={$$restProps.class} on:click><slot /></button>
{/if}
