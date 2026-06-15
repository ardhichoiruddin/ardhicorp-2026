<script lang="ts">
	import type { ContactDocumentData } from '../../../../../prismicio-types';
	import Input from '$lib/components/globals/input.svelte';
	import Textarea from '$lib/components/globals/textarea.svelte';
	import { Turnstile } from 'svelte-turnstile';
	import { env } from '$env/dynamic/public';

	const PUBLIC_TURNSTILE_SITE_KEY = env.PUBLIC_TURNSTILE_SITE_KEY;

	interface Props {
		data: ContactDocumentData;
	}

	let { data }: Props = $props();

	const title = $derived(data.title);
	const subTitle = $derived(data.sub_title);

	let sendLoading = $state(false);
	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	let isSendMessageSuccess = $state<'ONPROGRESS' | 'SUCCESS' | 'FAILED'>('ONPROGRESS');
	let turnstileToken = $state('');

	async function handleContactSubmit(e: any) {
		e.preventDefault();
		isSendMessageSuccess = 'ONPROGRESS';
		sendLoading = true;
		const response = await fetch(`/api/contact`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Turnstile-Token': turnstileToken
			},
			body: JSON.stringify($state.snapshot(formData))
		});
		const result = (await response.json()) as
			| {
					success: true;
					message: string;
			  }
			| {
					success: false;
					error: string;
			  };
		if (result.success) {
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};
			isSendMessageSuccess = 'SUCCESS';
		} else {
			isSendMessageSuccess = 'FAILED';
		}

		sendLoading = false;
	}
</script>

<section class="relative">
	<h1 class="font-h1 text-h1 wavy-underline inline-block mb-6">{title}</h1>
	<p class="font-body-lg text-body-lg text-on-surface-variant mt-4">
		{subTitle}
	</p>
</section>

<section class="relative p-8 sketch-border my-10">
	<div class="absolute -top-3 -left-4 w-16 h-6 tape"></div>
	<div class="absolute -bottom-3 -right-4 w-20 h-7 tape rotate-3"></div>
	{#if isSendMessageSuccess === 'ONPROGRESS'}
		{@render form()}
	{:else if isSendMessageSuccess === 'SUCCESS'}
		{@render success()}
	{:else if isSendMessageSuccess === 'FAILED'}
		{@render failed()}
	{/if}
</section>

{#snippet form()}
	<form class="space-y-10" onsubmit={handleContactSubmit}>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
			<!-- Name Field -->
			<div class="flex flex-col gap-2">
				<Input
					id="name"
					label="Name"
					placeholder="Who are you?"
					iconClass="icon-person"
					type="text"
					maxlength={100}
					inputClass="text-lg"
					required
					bind:value={formData.name}
					minlength={3}
					disabled={sendLoading}
				/>
			</div>
			<!-- Email Field -->
			<div class="flex flex-col gap-2">
				<Input
					id="email"
					label="Email"
					placeholder="Your return address..."
					iconClass="icon-mail-outline"
					type="email"
					maxlength={225}
					inputClass="text-lg"
					required
					bind:value={formData.email}
					minlength={3}
					disabled={sendLoading}
				/>
			</div>
		</div>
		<!-- Subject Field -->
		<div class="flex flex-col gap-2">
			<Input
				id="subject"
				label="Subject"
				placeholder="What's on your mind?"
				iconClass="icon-topic-outline"
				type="text"
				maxlength={150}
				inputClass="text-lg"
				required
				bind:value={formData.subject}
				minlength={10}
				disabled={sendLoading}
			/>
		</div>
		<!-- Message Field -->
		<div class="flex flex-col gap-2 relative">
			<Textarea
				id="message"
				label="Message"
				placeholder="Write your thoughts here..."
				rows={5}
				iconClass="icon-edit-note"
				maxlength={2500}
				required
				textareaClass="text-lg sm:text-xl"
				bind:value={formData.message}
				minlength={10}
				disabled={sendLoading}
			/>
			<!-- Doodle absolute decoration -->
			<div class="absolute -right-6 -bottom-6 doodle-float opacity-30">
				<span
					class="material-symbols-outlined text-[40px] icon-send"
					style="font-variation-settings: &quot;FILL&quot; 1"
				></span>
			</div>
		</div>
		<div class="mb-0">
			<Turnstile
				siteKey={PUBLIC_TURNSTILE_SITE_KEY}
				on:turnstile-callback={(e) => (turnstileToken = e.detail.token)}
				theme="light"
			/>
		</div>
		<!-- Submit Button -->
		<div class="pt-6 flex items-center gap-6">
			<button
				class="btn-sketch bg-primary text-on-primary font-h3 text-h3 px-10 py-3 jitter disabled:opacity-45 disabled:cursor-progress"
				type="submit"
				disabled={sendLoading}
			>
				Send Message
			</button>
			<div
				class="hidden md:flex items-center gap-2 text-on-tertiary-container font-note text-note italic"
			>
				<span class="icon-auto-fix-hight"></span>
				Ink-dried and ready to fly!
			</div>
		</div>
	</form>
{/snippet}

{#snippet success()}
	<div class="flex flex-col items-center text-center py-10 space-y-6">
		<div class="relative">
			<span class="text-[120px] text-primary opacity-80 doodle-float icon-send"></span>
			<div class="absolute -right-4 -top-4">
				<span class="text-primary text-[40px] icon-auto-fix-hight"></span>
			</div>
		</div>
		<div class="space-y-2">
			<h3 class="font-h2 text-h2 text-primary">Ink-dried and delivered!</h3>
			<p class="font-body-lg text-body-lg text-on-surface-variant">
				Your message has reached my sketchbook. I'll get back to you as soon as I put down my
				pencil.
			</p>
		</div>
		<div class="pt-4">
			<button
				class="btn-sketch bg-primary text-on-primary font-h3 text-h3 px-10 py-3 jitter"
				onclick={() => window.location.reload()}
			>
				Write another message
			</button>
		</div>
	</div>
{/snippet}

{#snippet failed()}
	<div class="flex flex-col items-center justify-center py-10 text-center space-y-6">
		<div class="relative">
			<span class="icon-edit-off text-[80px] text-error opacity-80 doodle-float"></span>
			<div class="absolute -right-4 -top-2 rotate-12">
				<span class="icon-close text-error"></span>
			</div>
		</div>
		<div class="space-y-2">
			<h3 class="font-h3 text-h3 text-error">Oops! The pencil lead broke.</h3>
			<p class="font-body-lg text-on-surface-variant">
				Something went wrong with the ink. Your message couldn't be delivered.
			</p>
		</div>
		<div class="pt-4">
			<button
				class="btn-sketch bg-background border-error text-error font-h3 text-h3 px-10 py-3 jitter flex items-center gap-2"
				onclick={() => window.location.reload()}
			>
				<span class="icon-refresh"></span>
				Try again
			</button>
		</div>
		<p class="font-note text-note italic text-on-tertiary-container mt-4">
			If the problem persists, please reach out via Twitter.
		</p>
	</div>
{/snippet}
