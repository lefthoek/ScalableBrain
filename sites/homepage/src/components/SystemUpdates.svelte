<script lang="ts">
  import { operationStore, subscription } from "@urql/svelte";

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
</script>

<div class="space-y-8">
  <div class="space-y-4">
    <h2 class="text-4xl">Messages</h2>
    {#if !$messages.data}
      <p>No New Messages</p>
    {:else}
      <ul>
        {#each $messages.data as message}
          <li>
            <details>
              <summary class="block font-semibold">
                {message.detailType}
              </summary>
              <div>
                {#each Object.keys(JSON.parse(message.detail)) as key}
                  <p>{key}: {JSON.parse(message.detail)[key]}</p>
                {/each}
              </div>
            </details>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
