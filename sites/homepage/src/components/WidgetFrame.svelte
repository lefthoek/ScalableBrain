<script lang="ts">
  import LefthoekLogo from "./LefthoekLogo.svelte";
  export let fullScreen = true;
</script>

<div class:md:rounded-md={fullScreen} class="w-full h-full justify-between">
  <div
    class="space-y-3 p-8 h-full border rounded-lg border-skin-inverted dark:border-skin-base
    overflow-y-scroll"
  >
    <slot />
  </div>
  {#if !fullScreen}
    <div class="mt-10 flex justify-between px-1 items-center">
      <slot name="footer" />
      <LefthoekLogo class="w-12" />
    </div>
  {/if}
</div>
