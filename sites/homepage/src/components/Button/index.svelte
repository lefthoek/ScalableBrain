<script>
  import Button from "./Button.svelte";
  export let href = "";
  export let disabled = false;
</script>

<Button
  class={`inline-block min-w-max w-48 leading-10 font-sans font-semibold text-xl rounded-3xl align-middle py-1 h-12 px-12 text-center bg-skin-button-accent/0 text-skin-secondary dark:text-skin-primary border hover:bg-skin-secondary dark:hover:bg-skin-primary hover:text-skin-primary dark:hover:text-skin-secondary transition-colors hover:border-skin-secondary dark:hover:border-skin-primary disabled:hover:border-skin-muted disabled:text-skin-muted disabled:hover:text-skin-muted disabled:hover:bg-skin-primary/0`}
  {href}
  {disabled}
  on:click><slot /></Button
>
