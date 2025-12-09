<script lang="ts">
	import { StatusCode, type Status } from '$lib/types';

	export let systems: Array<[string, Status[]]>;

	const lastState = systems.map(([, status]) => status.at(-1));
	let systemState: StatusCode;
	if (lastState.every((state) => state?.status === StatusCode.OK)) {
		systemState = StatusCode.OK;
	} else if (lastState.every((state) => state?.status === StatusCode.ERROR)) {
		systemState = StatusCode.ERROR;
	} else {
		systemState = StatusCode.UNSTABLE;
	}

	const statusCopy = {
		[StatusCode.OK]: {
			title: 'All systems operational',
			message: 'Every monitored service is performing as expected.',
			chip: 'border border-success/40 bg-success/10 text-success',
			icon: '✓'
		},
		[StatusCode.UNSTABLE]: {
			title: 'Partial disruption',
			message: 'Some components are degraded while we work on a fix.',
			chip: 'border border-warning/40 bg-warning/10 text-warning',
			icon: '!'
		},
		[StatusCode.ERROR]: {
			title: 'Major outage',
			message: 'A critical problem is impacting multiple systems.',
			chip: 'border border-error/40 bg-error/10 text-error',
			icon: '×'
		}
	} satisfies Record<StatusCode, { title: string; message: string; chip: string; icon: string }>;

	const latestUpdate = lastState
		.filter((entry): entry is Status => Boolean(entry))
		.sort((a, b) => +b.date - +a.date)[0];
</script>

<div class="surface-card">
	<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<div class="space-y-3">
			<span
				class={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest ${statusCopy[systemState].chip}`}
			>
				<span>{statusCopy[systemState].icon}</span>
				{statusCopy[systemState].title}
			</span>
			<div>
				<h2 class="font-heading text-3xl text-white">{statusCopy[systemState].title}</h2>
				<p class="mt-1 text-sm text-white/70">{statusCopy[systemState].message}</p>
			</div>
		</div>
		<div class="space-y-2 text-sm text-white/60">
			<p class="text-xs uppercase tracking-[0.3em] text-white/50">Last updated</p>
			<p>
				{#if latestUpdate}
					{latestUpdate.date.toLocaleDateString('en-US', {
						month: 'long',
						day: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					})}
				{:else}
					Awaiting first report
				{/if}
			</p>
			<p class="text-xs uppercase tracking-[0.3em] text-white/50">{systems.length} services monitored</p>
		</div>
	</div>
</div>
