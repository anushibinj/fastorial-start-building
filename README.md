# start.fastorial.dev

A project-idea picker for the fastorial coding mentorship community. It asks a
beginner two quick questions — their experience level and their background —
and hands back coding project ideas picked for exactly that combination, each
with a full write-up.

The whole site is static: no server, no database, no API routes. It builds to
a folder of plain HTML/CSS/JS you can host anywhere (Netlify, GitHub Pages,
S3, Cloudflare Pages, whatever).

## Adding a project — the two-file pattern

You do not need to touch any route or component code to add a new project.
Every page (its listing entry, its filter pages, its own URL) is generated
automatically from two files:

1. **Add one entry to [`content/projects.json`](./content/projects.json)**

   ```json
   {
     "slug": "expense-tracker",
     "name": "Expense Tracker with Budget Alerts",
     "level": "beginner",
     "tag": "CRUD + logic",
     "personas": ["student", "fresher", "qa-to-dev", "other"],
     "seoDescription": "Build a budget tracker that actually warns you before you overspend — real aggregation logic, not another todo list."
   }
   ```

   Field notes:
   - `slug` — lowercase, kebab-case, must be unique. This becomes the URL:
     `/project/<slug>`.
   - `level` — one of `beginner`, `intermediate`, `advanced`.
   - `tag` — a short topic label shown as a badge (e.g. `"Realtime"`,
     `"Auth + APIs"`).
   - `personas` — who this project is especially relevant to, any of
     `student`, `fresher`, `qa-to-dev`, `other`. Most projects list all four;
     tag a project with just one persona if it's genuinely written for that
     audience (see `bug-tracker` and `test-automation-framework` for
     QA-to-Dev-only examples).
   - `seoDescription` — a short, specific, hand-written sentence. This is
     what shows up in Google results and in link previews (Slack, Discord,
     Twitter) for that project's page, so write something a person would
     actually want to click — not a copy of the overview paragraph.

2. **Add one markdown file at `content/projects/<slug>.md`**

   The filename must match the `slug` exactly. The file is body content only
   (no frontmatter — all the metadata lives in `projects.json`) and must use
   these five section headings, in this order:

   ```markdown
   ## Overview

   ## Why it's worth building

   ## Build this

   ## The constraint that makes it real

   ## What you'll practice
   ```

   `Build this` and `What you'll practice` are typically bullet lists; the
   other three are a few sentences of prose. Look at any existing file in
   `content/projects/` for the tone and length to match.

That's it. The next time you run `npm run dev` or `npm run build`:

- `/project/<slug>` is generated automatically.
- The project shows up in `/all`.
- It shows up in `/filter/<level>` and in `/filter/<level>/<persona>` for
  every persona listed in `personas`.
- A dark-charcoal, amber-accented social preview image is generated for its
  page automatically — you don't need to make one.
- If you typo a level, misspell a persona, forget a field, or leave
  `seoDescription` too short, the build fails immediately with a specific
  error telling you which field in which entry is wrong — it won't silently
  ship a broken page.

## How the routes are generated

This is a Next.js App Router project. All of the metadata (title, meta
description, canonical URL, Open Graph tags, Twitter card, sitemap entry) and
the actual project listings are computed from `content/projects.json` at
build time using `generateStaticParams` — there is no manually maintained
list of routes anywhere in `/app`. Concretely:

| Route                       | Generated from                                                             |
| --------------------------- | -------------------------------------------------------------------------- |
| `/`                         | static — the level/background picker                                       |
| `/all`                      | `getAllProjects()`                                                         |
| `/filter/[level]`           | one page per distinct `level` in the manifest                              |
| `/filter/[level]/[persona]` | one page per `level` × `persona` combination that has at least one project |
| `/project/[slug]`           | one page per manifest entry                                                |

So: add a project with a new `level` value your manifest doesn't have yet
(there shouldn't be a reason to — the three levels are fixed), and a new
level filter page appears on its own. Add a project tagged with a persona
that level didn't have before, and that combo page appears on its own too.
Zero route code changes required either way.

## Project structure

```
app/            Routes (pages, layouts, metadata, sitemap, robots, OG images)
components/     Shared UI (CSS Modules, no component library)
content/        The manifest (projects.json) and one markdown file per project
lib/            Data loading, zod validation, and SEO copy helpers
```

- `lib/types.ts` — the `Project` TypeScript interface and the `Level`/
  `Persona` unions.
- `lib/schema.ts` — the zod schema that validates `projects.json` at build
  time.
- `lib/projects.ts` — loads and validates the manifest once, then exposes
  helpers like `getProjectBySlug`, `getProjectsByLevel`, and
  `getProjectsByLevelAndPersona`.
- `lib/markdown.ts` — reads a project's markdown file from disk.
- `lib/seo-copy.ts` — the hand-written title/description copy for every
  level and level+persona combination page (not autogenerated boilerplate).
- `lib/og.tsx` — the shared Open Graph image template used by every route's
  `opengraph-image.tsx`.

## Running it locally

You need Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Building for production

```bash
npm run build
```

This produces a static export in `out/` (because `next.config.ts` sets
`output: "export"`) — a plain folder of HTML, CSS, JS, and images you can
upload to any static host. There is no Node server to run in production.

To preview the built output locally:

```bash
npm run start
```

## Other commands

```bash
npm run lint       # ESLint
npm run format     # Prettier, writes changes
npm run typecheck  # TypeScript, no emit
```
