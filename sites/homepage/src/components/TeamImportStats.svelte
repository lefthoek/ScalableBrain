<script lang="ts">
  export let team_id: string;
  import { operationStore, query, subscription } from "@urql/svelte";

  const teamData = operationStore(`
    query {
      team {
        id
        name
      }
    }
  `);

  const messages = operationStore(`
    subscription {
      addedTeams {
        id
        name
      }
    }
  `);

  const handleSubscription = (messages = [], data: any) => {
    return [data.addedTeams, ...messages];
  };

  subscription(messages, handleSubscription);

  query(teamData);
</script>

<h1 class="text-8xl font-serif mb-8 text-skin-base dark:text-skin-inverted">
  {#if $teamData.data}
    {$teamData.data.team.name}
  {:else}
    {team_id}
  {/if}
</h1>

{#if !$messages.data}
  <p>No new messages</p>
{:else}
  <ul>
    {#each $messages.data as message}
      <li>{message.id}: "{message.name}"</li>
    {/each}
  </ul>
{/if}
