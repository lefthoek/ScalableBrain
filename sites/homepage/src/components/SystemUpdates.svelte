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
              <code>{message.detail}</code>
            </details>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
