<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { getGithubContributions } from '$lib/helper/github';
	import ActivityCalendarWidget from 'activity-calendar-widget/svelte';
	import { tick } from 'svelte';

	type Props = SliceComponentProps<Content.GithubCalenderContributionsSlice>;

	const { slice }: Props = $props();

	const data = $derived(slice.primary);
	const title = $derived(data.title);
	const githubUsername = $derived(data.github_username as string);
	let loading = $state(false);

	let contributionsData = $state<
		{
			date: string;
			activities: number[];
		}[]
	>([]);

	async function getDataGithubContributions() {
		if (!githubUsername) return;
		try {
			loading = true;
			const githubCont = await getGithubContributions(githubUsername);
			contributionsData = githubCont.contributions.map((item) => ({
				date: item.date,
				activities: new Array(item.count).fill(0)
			}));
			await tick();
			loading = false;
		} catch {
			loading = false;
		}
	}

	onMount(async () => {
		getDataGithubContributions();
	});
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="my-10">
	<h2 class="font-h2 text-h2 text-primary dark:text-inverse-primary wavy-underline mb-8">
		{title}
	</h2>
	<div class="bg-surface-container-lowest dark:bg-surface-container p-6 sketch-border">
		{#if loading}
			<span>Please wait. Currently retrieving data...</span>
		{/if}
		<div class="w-full h-full overflow-x-auto">
			<ActivityCalendarWidget
				data={contributionsData}
				daysToRender={310}
				levelColorMode="dark"
				showSummary={true}
				showLevels={true}
				levelColors={['#ebedf0', '#1c1c1c']}
			/>
		</div>
	</div>
</section>
