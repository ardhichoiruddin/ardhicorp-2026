<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { getGithubContributions } from '$lib/helper/github';
	import ActivityCalendarWidget from 'activity-calendar-widget/svelte';

	type Props = SliceComponentProps<Content.GithubCalenderContributionsSlice>;

	const { slice }: Props = $props();

	const data = $derived(slice.primary);
	const title = $derived(data.title);
	const githubUsername = $derived(data.github_username as string);

	async function getDataGithubContributions(username: string) {
		if (!username) return [];
		const githubCont = await getGithubContributions(username);
		return githubCont.contributions.map((item) => ({
			date: item.date,
			activities: new Array(item.count).fill(0)
		}));
	}

	const contributionsPromise = $derived(getDataGithubContributions(githubUsername));
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="my-10">
	<h2 class="font-h2 text-h2 text-primary wavy-underline mb-8">
		{title}
	</h2>
	<svelte:boundary>
		<div class="bg-surface-container-lowest p-6 sketch-border">
			{#await contributionsPromise then contributionsData}
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
			{/await}
		</div>
		{#snippet pending()}
			<div class="bg-surface-container-lowest p-6 sketch-border">
				<span>Please wait. Currently retrieving data...</span>
			</div>
		{/snippet}
		{#snippet failed(error: any, reset)}
			<div class="bg-surface-container-lowest p-6 sketch-border">
				<div class="text-error">
					<p>Failed to load GitHub data: {error?.message}</p>
					<button onclick={reset} class="btn">Try Again</button>
				</div>
			</div>
		{/snippet}
	</svelte:boundary>
</section>
