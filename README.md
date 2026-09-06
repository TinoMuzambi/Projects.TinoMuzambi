# Tino Muzambi engineering archive

The dedicated project archive for [tinomuzambi.com](https://tinomuzambi.com). It presents selected research, data and software work alongside a complete, honestly labelled catalogue of earlier projects.

## Local development

```bash
npm ci
npm run dev
```

The site runs at `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Content model

Canonical project records live in `content/projects.ts` and follow the strict types in `types/projects.ts`. Human pages, search and filters, project JSON-LD, `/projects.json`, `/llms.txt`, sitemap entries and legacy redirects all derive from those records.

Each public claim should remain attributable to an inspectable repository, report, application or documentation page. Unknown details should use `null` instead of an inferred date, metric, role or outcome.

## Architecture

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS 4
- Local variable fonts shared with the main portfolio
- Static project routes and machine-readable endpoints
- No CMS or runtime content dependency

The visual rationale and responsive wireframes are recorded in `docs/design-plan.md`.
