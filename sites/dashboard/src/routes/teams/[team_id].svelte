<script>
	import { page } from '$app/stores';
	const { team_id } = $page.params;
</script>

<h1 class="text-8xl">{team_id}</h1>
<pre>{JSON.stringify($page.params, null, 2)}</pre>
