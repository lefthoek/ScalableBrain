<script>
	import { page } from '$app/stores';
</script>

<h1>{JSON.stringify($page, null, 2)}</h1>
<h1>{JSON.stringify(window.location.search, null, 2)}</h1>
