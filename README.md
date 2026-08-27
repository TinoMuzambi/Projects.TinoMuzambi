# Projects.TinoMuzambi

This Next.js application is a landing page for projects by Tino Muzambi. Storyblok remains the source of truth for project content, tags, featured status, and external links.

## Prerequisites

- Node.js 22.x
- Yarn Classic 1.22.22

The Node requirement and Yarn version are declared in `package.json`. Yarn enforces the Node requirement during installation, while GitHub Actions and Vercel read the same manifest, keeping the runtime contract aligned. Keep `yarn.lock` when changing dependencies.

## Local setup

Install the locked dependencies:

```sh
yarn install --frozen-lockfile
```

Local development needs these variable names:

- `REACT_APP_STORYBLOK_KEY`: server-only Storyblok delivery credential
- `ANALYTICS_CODE`: public analytics tracking identifier

Values are managed in Vercel and pulled into ignored local environment files. From an authenticated, linked checkout:

```sh
vercel env pull .env.development.local --environment=development
```

Never commit environment files, `.vercel` metadata, or credential values.

## Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the local development server |
| `yarn lint` | Run Next.js ESLint checks |
| `yarn type-check` | Run strict TypeScript checking |
| `yarn test` | Run all TypeScript regression tests |
| `yarn build` | Create the production build using Storyblok |
| `yarn start` | Serve a completed production build |

GitHub Actions runs a frozen install, lint, strict typechecking, and tests on pull requests and pushes to `master`, the repository's default branch. Vercel performs the environment-backed production build and preview deployment.
