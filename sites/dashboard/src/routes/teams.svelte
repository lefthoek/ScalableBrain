<script>
	import { page } from '$app/stores';
</script>

<h1>{JSON.stringify($page.query.get('team_id'), null, 2)}</h1>
