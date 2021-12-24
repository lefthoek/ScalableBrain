<script lang="ts">
  export let type = "button";
  export let href = "";
  export let target = "__blank";
  let buttonClasses =
    "border border-background px-4 p-2 hover:bg-background hover:text-dark text-background rounded-md text-center text-cipria";
</script>

{#if href}
  <a {target} class={buttonClasses} {href}><slot /></a>
{:else}
  <button on:click class={buttonClasses} {type}>
    <slot />
  </button>
{/if}
