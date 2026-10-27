This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
pnpm dev              # Start the Astro dev server
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Site

The portfolio of Ryota Nakahara (uzulab), served at ryotanakahara.jp. It started from the EmDash portfolio template, but the template's design was replaced with a port of the previous Next.js site: SCSS (`src/styles/_variables.scss`, `src/styles/global.scss`), the Avenir font in `public/fonts`, and the components in `src/components`. The template's `tokens.css` / `theme.css` system does not exist here. Keep the look identical to the previous site unless asked otherwise.

Deployment, secrets, and the preview workflow are documented in `README.md`.

## Pages

| Page           | Path           | What it shows                                                                      |
| -------------- | -------------- | ---------------------------------------------------------------------------------- |
| Home           | `/`            | All works ordered by `sort_order`, with a client-side tag filter                   |
| Work detail    | `/work/[slug]` | Header images (PC/SP), meta (duration, responsibility, tags), Portable Text body   |
| Work index     | `/work`        | 301 redirect to `/`                                                                |
| About          | `/about`       | Static content defined in `src/lib/about.ts` (not managed in the CMS)              |
| Contact        | `/contact`     | Contact form posting to `/api/contact`, which sends mail via Amazon SES (`src/lib/mail.ts`) |

## Schema

- `projects` collection (`/work/{slug}`): `title`, `featured_image` (card thumbnail), `header_pc`, `header_sp`, `client`, `year`, `summary`, `subtitle`, `start_date`, `end_date`, `responsibility`, `content` (Portable Text), `gallery`, `url`, `sort_order` (integer, display order).
- `pages` collection: unused for now.
- Taxonomy `tag` with terms `web`, `app`, `logo`. Tags render in the taxonomy's order (`src/lib/works.ts`).
- `seed/seed.json` holds the schema, the works converted from microCMS, and 301 redirects from the old microCMS ids.

## Environment notes

- Admin auth is Cloudflare Access (`access()` in `astro.config.mjs`), not passkeys. Locally, open `/_emdash/api/setup/dev-bypass` to get a dev admin session.
- Previews share the production D1 / R2 / KV. Anything done on a preview changes production data.
- Production deploys are manual (`pnpm run deploy`). Never deploy to a Cloudflare account other than the one pinned by `account_id` in `wrangler.jsonc`.
- Secrets (`EMDASH_ENCRYPTION_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) live only in Cloudflare and `.dev.vars` / `.env` (gitignored). Never commit their values.
