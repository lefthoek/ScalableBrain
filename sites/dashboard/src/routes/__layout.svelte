<script lang="ts">
	import '../app.css';
</script>

<main>
	<div class="container">
		<slot />
	</div>
</main>

<style lang="postcss">
	.container {
		@apply max-w-4xl mx-auto py-8;
	}
</style>
