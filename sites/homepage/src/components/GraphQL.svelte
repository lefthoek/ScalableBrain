<script lang="ts">
  import {
    createClient,
    defaultExchanges,
    subscriptionExchange,
    setClient,
  } from "@urql/svelte";

  import { createClient as createWSClient } from "graphql-ws";

  const wsClient = createWSClient({
    url: "wss://d5mcdrp9bg.execute-api.eu-west-1.amazonaws.com/dev",
  });

  const client = createClient({
    url: "https://bdaey0v9lf.execute-api.eu-west-1.amazonaws.com/dev/graphql",
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
  });

  setClient(client);
</script>

<slot />
