<script lang="ts">
	import Incidents from '$lib/components/Incidents.svelte';
	import Status from '$lib/components/Status.svelte';
	import System from '$lib/components/System.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="px-6 pb-10 pt-4">
	<div class="mx-auto flex max-w-4xl flex-col items-center text-center gap-4">
		<h1 class="font-heading text-4xl leading-tight text-white sm:text-5xl md:text-6xl">Fenrai status</h1>
		<p class="text-base text-white/70 sm:text-lg">
			Current health for all monitored Fenrai services.
		</p>
	</div>
	<div class="relative mx-auto mt-12 w-full max-w-4xl">
		<System systems={data.statusLog} />
	</div>
</section>

<main class="mx-auto w-full max-w-6xl px-6 pb-20">
	<div class="space-y-6">
		{#each data.statusLog as [name, siteStatus]}
			<Status {name} statuses={siteStatus} />
		{/each}
		{#if data.incidents?.length > 0}
			<div class="fenrai-divider" />
			<Incidents incidents={data.incidents} />
		{/if}
	</div>
</main>
