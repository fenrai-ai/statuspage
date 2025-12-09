<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>Status Page | Fenrai</title>
	<meta
		name="description"
		content="Live Fenrai status dashboard with transparent uptime, incidents, and service health updates."
	/>
</svelte:head>

<div data-theme="fenrai" class="min-h-screen bg-fenrai-bg text-base-content flex flex-col">
	<header class="mx-auto w-full max-w-6xl px-6 py-6">
		<div class="flex items-center justify-between rounded-full border border-white/5 bg-[#0b0b0f]/70 px-5 py-3 backdrop-blur">
			<p class="text-sm uppercase tracking-[0.4em] text-white/60">Fenrai Status</p>
			<a
				class="pill-button bg-white text-fenrai-bg hover:bg-white/90"
				href="https://www.fenrai.app"
				target="_blank"
				rel="noreferrer"
				>Use Fenrai</a
			>
		</div>
	</header>
	<main class="flex-1 w-full">
		<slot />
	</main>
	<footer class="border-t border-white/5 bg-[#0b0b0f]/70 backdrop-blur py-6 mt-12">
		<div
			class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between"
		>
			<p class="font-heading text-white/70">Fenrai · Status</p>
			<a
				href="https://www.fenrai.app"
				target="_blank"
				rel="noreferrer"
				class="text-primary transition hover:text-white"
				>fenrai.app</a
			>
		</div>
	</footer>
</div>
