<script>
  import Button from "./Button.svelte";
  export let href = "";
</script>

<Button
  class={`inline-block leading-10 font-sans font-semibold text-xl rounded-3xl align-middle py-1 h-12 px-12 text-center bg-skin-button-accent/0 text-skin-primary border hover:bg-skin-primary hover:text-skin-inverted hover:border-none`}
  {href}><slot /></Button
>
