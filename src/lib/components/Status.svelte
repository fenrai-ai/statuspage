<script lang="ts">
	import { StatusCode, type Status } from '$lib/types';

	export let name: string;
	export let statuses: Status[];

	const calculateDifferenceInDays = (firstDate: Date, secondDate: Date): number =>
		Math.ceil(Math.abs(+firstDate - +secondDate) / (1000 * 60 * 60 * 24)) + 1;

	let message = 'Lacking historical data';
	let lastStatus: Status = { status: StatusCode.ERROR, date: new Date() };
	if (statuses.length > 0) {
		lastStatus = statuses[statuses.length - 1];
		const operationPercentage = Math.floor(
			(statuses.reduce((prev, current) => prev + (current.status === StatusCode.OK ? 1 : 0), 0) /
				statuses.length) *
				100
		);

		message = `Operation in last ${calculateDifferenceInDays(statuses[0].date, lastStatus.date)} days: ${operationPercentage}%`;
	}

	const indicatorCopy = {
		[StatusCode.OK]: {
			label: 'Operational',
			chip: 'border border-success/40 bg-success/10 text-success',
			dot: 'bg-success'
		},
		[StatusCode.UNSTABLE]: {
			label: 'Degraded',
			chip: 'border border-warning/40 bg-warning/10 text-warning',
			dot: 'bg-warning'
		},
		[StatusCode.ERROR]: {
			label: 'Outage',
			chip: 'border border-error/40 bg-error/10 text-error',
			dot: 'bg-error'
		}
	} satisfies Record<StatusCode, { label: string; chip: string; dot: string }>;

	const barGradients = {
		[StatusCode.OK]: 'from-emerald-400/70 via-emerald-500/80 to-emerald-400/70',
		[StatusCode.UNSTABLE]: 'from-amber-300/80 via-amber-400/70 to-amber-500/80',
		[StatusCode.ERROR]: 'from-rose-400/80 via-rose-500/70 to-rose-600/80'
	} satisfies Record<StatusCode, string>;
</script>

<div class="surface-card space-y-4">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-white/50">Service</p>
			<h2 class="font-heading text-2xl text-white">{name}</h2>
		</div>
		<span
			class={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest ${indicatorCopy[lastStatus.status].chip}`}
		>
			<span class={`h-2 w-2 rounded-full ${indicatorCopy[lastStatus.status].dot}`}></span>
			{indicatorCopy[lastStatus.status].label}
		</span>
	</div>
	<p class="text-sm text-white/70">{message}</p>

	<div class="flex gap-1 pt-1">
		{#each statuses as { status, date }}
			<div
				title={date.toLocaleDateString('en-US', {
					month: 'long',
					day: '2-digit',
					year: 'numeric'
				})}
				class={`h-8 flex-1 rounded-md bg-gradient-to-r ${barGradients[status]} transition duration-150 hover:opacity-80`}
			></div>
		{/each}
	</div>
</div>
