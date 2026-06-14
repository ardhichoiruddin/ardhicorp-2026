export type GithubContributionsReponse = {
	total: Record<string, number>;
	contributions: {
		count: number;
		date: string;
		level: number;
	}[];
};
export async function getGithubContributions(username: string) {
	const response = await fetch(
		`https://github-contributions-api.jogruber.de/v4/${username}?y=last`
	);
	const result = await response.json();
	return result as GithubContributionsReponse;
}
