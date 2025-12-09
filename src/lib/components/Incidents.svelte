<script lang="ts">
	import type { ReportFile } from '$lib/types';
	import moment from 'moment';

	export let incidents: ReportFile['incidents'];

	const badgeClasses = (open: boolean): string =>
		open
			? 'border border-warning/40 bg-warning/10 text-warning'
			: 'border border-success/40 bg-success/10 text-success';
</script>

<div class="surface-card">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-white/50">Log</p>
			<h2 class="font-heading text-2xl text-white">Recent incidents</h2>
		</div>
		<p class="text-sm text-white/60">
			Live feed of scheduled maintenance, degradations, and resolved issues.
		</p>
	</div>
	<ul class="relative mt-6 space-y-5 border-l border-white/10 pl-6">
		{#each incidents as incident}
			<li class="relative">
				<span
					class={`absolute -left-[9px] top-1.5 h-3 w-3 rounded-full ring-2 ring-fenrai-card ${incident.open ? 'bg-warning' : 'bg-success'}`}
				></span>
				<div class="flex flex-wrap items-center gap-3">
					<p class="text-sm text-white/60">{moment.unix(incident.date).format('MMM Do YYYY')}</p>
					<span class={`inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest ${badgeClasses(incident.open)}`}>
						{incident.open ? 'open' : 'resolved'}
					</span>
				</div>
				<p class="mt-2 text-base font-medium text-white">{incident.title}</p>
			</li>
		{/each}
	</ul>
</div>
