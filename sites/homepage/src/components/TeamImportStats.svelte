<script lang="ts">
  export let team_id: string;

  import { operationStore, query, subscription } from "@urql/svelte";
  import JSONTree from "svelte-json-tree";

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
      systemEvents {
        detailType
        detail
      }
    }
  `);

  const handleSubscription = (messages = [], data: any) => {
    return [data.systemEvents, ...messages];
  };

  subscription(messages, handleSubscription);

  query(teamData);
</script>

<div class="space-y-8">
  <div>
    {#if $teamData.data}
      <h1
        class="text-8xl font-serif mb-8 text-skin-base dark:text-skin-inverted"
      >
        {$teamData.data.team.name}
      </h1>
      <div>
        <h2>
          Lefthoek Id:
          <span>{$teamData.data.team.id}</span>
        </h2>
        <h2>Providers:</h2>
        {#each $teamData.data.team.providers as { type, id }}
          <ul class="list-disc list-inside">
            <li>{type}: {id}</li>
          </ul>
        {/each}
      </div>
    {:else}
      <h1
        class="text-4xl font-serif mb-8 text-skin-base dark:text-skin-inverted"
      >
        {team_id}
      </h1>
    {/if}
  </div>

  <div class="space-y-4">
    <h2 class="text-4xl">Messages</h2>
    {#if !$messages.data}
      <p>No New Messages</p>
    {:else}
      <ul>
        {#each $messages.data as message}
          <li>
            <span class="block font-semibold">
              {message.detailType}
            </span>
            <JSONTree value={JSON.parse(message.detail)} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
