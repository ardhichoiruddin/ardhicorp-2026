# ardhicorp.com

Personal portfolio website for [ardhicorp.com](https://ardhicorp.com/).

This project is built with **Svelte 5**, **Tailwind CSS**, and **Prismic CMS**. The live site presents Ardhi Choiruddin as a Fullstack Developer & AI Engineer, including sections for experience, portfolio, and skills, plus contact and social links.

## Stack

- Svelte 5
- Tailwind CSS
- Prismic CMS
- Bun

## Features

- Content managed through Prismic CMS for structured, headless updates.
- Portfolio-style website with homepage sections for experience, portfolio, and skills.
- Designed for modern SvelteKit and Prismic workflows, including previews, routes, generated types, and slice-based content modeling.

## Requirements

- [Bun](https://bun.sh/)
- A Prismic account and repository

## Installation

Install dependencies with Bun:

```bash
bun install
```

## Development

Start your local development server with your preferred script from `package.json`.

If Prismic authentication is needed, log in with:

```bash
bun prismic:login
```

To sync schema and local Prismic-related changes:

```bash
bun prismic:sync
```

## Build

Create a production build with:

```bash
bun run build
```

Prismic’s SvelteKit integration supports page types, slices, generated TypeScript types, preview routes, and client setup through a central `prismicio` configuration file.

## Prismic workflow

Typical Prismic workflow for this project:

1. Log in to Prismic.
2. Sync the local Prismic configuration and generated artifacts.
3. Update content models or content in Prismic.
4. Run the app locally and verify the changes.
5. Build for production.

Useful commands:

```bash
bun prismic:login
bun prismic:sync
bun run build
```

Prismic’s official SvelteKit guide recommends using the generated Prismic client, SliceZone-based rendering, preview support, and route definitions that match SvelteKit file-system routes.

## Suggested project structure

```text
.
├── src/
├── static/
├── prismic.config.json
├── package.json
├── svelte.config.js
└── README.md
```

The exact structure may vary, but Prismic’s SvelteKit setup typically includes `prismic.config.json`, a client helper such as `$lib/prismicio.ts`, preview support, and route files that map to Prismic page types.

## Environment notes

If your Prismic repository uses private API access, store the access token in environment variables and pass it to the Prismic client on the server side rather than exposing it in the browser.

## Open source intent

This repository is intended to open source the codebase behind the portfolio website at [ardhicorp.com](https://ardhicorp.com/), which is publicly described as a portfolio built with Svelte 5, Tailwind CSS, and Prismic CMS.

## License

Choose the license that fits your goals, such as MIT for maximum reuse or GPL for reciprocal open-source distribution.
