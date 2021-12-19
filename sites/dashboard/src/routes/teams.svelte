<script>
	import { browser } from '$app/env';
	const params = browser ? new URLSearchParams(window.location.search) : new URLSearchParams({});
</script>

<h1>{params.toString()}</h1>
