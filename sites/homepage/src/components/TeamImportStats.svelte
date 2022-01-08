<script lang="ts">
  export let team_id: string;
  import { operationStore, query, subscription } from "@urql/svelte";

  const teamData = operationStore(
    `
    query($id: String!) {
      team(id: $id) {
        id
        name
        providers {
          id
          type
        }
      }
    }
  `,
    { id: team_id }
  );

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

{#if $teamData.data}
  <h1 class="text-8xl font-serif mb-8 text-skin-base dark:text-skin-inverted">
    {$teamData.data.team.name}
  </h1>
  <div>
    <h2>
      Lefthoek Id:
      <span>{$teamData.data.team.id}</span>
    </h2>
    <h2>Providers:</h2>
    {#each $teamData.data.team.providers as { type, id }}
      <ul>
        <li>{type}: {id}</li>
      </ul>
    {/each}
  </div>
{:else}
  <h1 class="text-4xl font-serif mb-8 text-skin-base dark:text-skin-inverted">
    {team_id}
  </h1>
{/if}

<h2>Messages:</h2>
{#if !$messages.data}
  <p>No New Messages</p>
{:else}
  <ul>
    {#each $messages.data as message}
      <li>{message.id}: "{message.name}"</li>
    {/each}
  </ul>
{/if}
