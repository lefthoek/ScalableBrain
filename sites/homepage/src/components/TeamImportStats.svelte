<script lang="typescript">
  const type = "button";
  const params = new URLSearchParams(window.location.search);
  const team_id = params.get("team_id");
</script>

<div class="widget" {type}>
  <h1 class="team_id">Team ID: {team_id}</h1>
</div>

<style lang="postcss">
  .team_id {
    @apply text-8xl;
  }
  .widget {
    @apply p-8 bg-neutral-900 text-gray-100;
  }
</style>
